#!/usr/bin/env python3
"""
Code Review Graph Builder
Analyzes source code dependencies and generates a visual graph
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, Set, List, Tuple

class CodeReviewGraph:
    def __init__(self, src_dir: str):
        self.src_dir = Path(src_dir)
        self.imports = defaultdict(set)  # file -> set of imported files
        self.external_deps = defaultdict(set)  # file -> set of external packages
        self.components = {}  # file -> component info
        self.all_files = set()

    def get_relative_path(self, filepath: Path) -> str:
        """Get relative path from src directory"""
        return str(filepath.relative_to(self.src_dir))

    def normalize_import(self, import_path: str, from_file: Path) -> str:
        """Convert import path to absolute file path relative to src"""
        # Handle relative imports
        if import_path.startswith('.'):
            # Relative import
            from_dir = from_file.parent
            target = from_dir / import_path
            target = target.resolve()

            # Handle .js/.jsx extensions
            if target.suffix not in ['.js', '.jsx']:
                for ext in ['.jsx', '.js', '/index.jsx', '/index.js']:
                    test_path = Path(str(target) + (ext if not target.is_dir() else ''))
                    if test_path.exists():
                        target = test_path
                        break

            try:
                return self.get_relative_path(target)
            except ValueError:
                return None

        # External import
        return None

    def extract_imports(self, filepath: Path) -> Tuple[Set[str], Set[str]]:
        """Extract internal and external imports from a file"""
        internal = set()
        external = set()

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except:
            return internal, external

        # Match ES6 imports
        pattern = r"import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+(?:\s*,\s*{[^}]*})?)\s+from\s+['\"]([^'\"]+)['\"]"
        matches = re.finditer(pattern, content)

        for match in matches:
            import_path = match.group(1)

            if import_path.startswith('.'):
                normalized = self.normalize_import(import_path, filepath)
                if normalized:
                    internal.add(normalized)
            else:
                # Extract package name (first part before /)
                pkg_name = import_path.split('/')[0]
                external.add(pkg_name)

        return internal, external

    def analyze_file(self, filepath: Path):
        """Analyze a single file"""
        rel_path = self.get_relative_path(filepath)
        self.all_files.add(rel_path)

        internal, external = self.extract_imports(filepath)
        self.imports[rel_path] = internal
        self.external_deps[rel_path] = external

        # Determine component type
        component_type = 'unknown'
        if 'components' in str(filepath):
            if 'ui' in str(filepath):
                component_type = 'ui-component'
            elif 'sections' in str(filepath):
                component_type = 'section'
            elif 'layout' in str(filepath):
                component_type = 'layout'
        elif 'hooks' in str(filepath):
            component_type = 'hook'
        elif 'data' in str(filepath):
            component_type = 'data'
        else:
            component_type = 'root'

        self.components[rel_path] = {
            'type': component_type,
            'name': filepath.stem,
            'imports': len(internal),
            'external_deps': len(external)
        }

    def analyze(self):
        """Analyze all source files"""
        for filepath in self.src_dir.rglob('*.jsx'):
            if 'node_modules' not in str(filepath):
                self.analyze_file(filepath)

        for filepath in self.src_dir.rglob('*.js'):
            if 'node_modules' not in str(filepath):
                self.analyze_file(filepath)

    def get_dependency_stats(self) -> Dict:
        """Calculate statistics about dependencies"""
        stats = {
            'total_files': len(self.all_files),
            'most_imported': [],
            'most_dependencies': [],
            'circular_risk': [],
            'isolated': [],
            'entry_points': [],
        }

        # Count how many files import each file
        import_count = defaultdict(int)
        for imports in self.imports.values():
            for imp in imports:
                import_count[imp] += 1

        # Most imported files
        stats['most_imported'] = sorted(import_count.items(), key=lambda x: x[1], reverse=True)[:5]

        # Files with most dependencies
        dep_counts = [(f, len(deps)) for f, deps in self.imports.items()]
        stats['most_dependencies'] = sorted(dep_counts, key=lambda x: x[1], reverse=True)[:5]

        # External dependency count
        ext_dep_total = defaultdict(set)
        for deps in self.external_deps.values():
            for dep in deps:
                ext_dep_total[dep].add(dep)

        # Isolated files (no internal imports)
        stats['isolated'] = [f for f, deps in self.imports.items() if len(deps) == 0]

        # Entry points (not imported by anyone)
        imported_files = set()
        for deps in self.imports.values():
            imported_files.update(deps)
        stats['entry_points'] = [f for f in self.all_files if f not in imported_files]

        return stats

    def generate_mermaid_graph(self) -> str:
        """Generate Mermaid diagram for the graph"""
        lines = ["graph TD"]

        # Add nodes with labels
        for file in self.all_files:
            component = self.components[file]
            label = f"{component['name']}<br/>({component['type']})"
            node_id = file.replace('/', '_').replace('-', '_').replace('.', '_')
            lines.append(f"    {node_id}[\"{label}\"]")

        # Add edges
        added_edges = set()
        for from_file, to_files in self.imports.items():
            from_id = from_file.replace('/', '_').replace('-', '_').replace('.', '_')
            for to_file in to_files:
                to_id = to_file.replace('/', '_').replace('-', '_').replace('.', '_')
                edge = (from_id, to_id)
                if edge not in added_edges:
                    lines.append(f"    {from_id} --> {to_id}")
                    added_edges.add(edge)

        return "\n".join(lines)

    def generate_text_report(self) -> str:
        """Generate detailed text report"""
        stats = self.get_dependency_stats()
        report = []

        report.append("=" * 80)
        report.append("CODE REVIEW GRAPH - DEPENDENCY ANALYSIS")
        report.append("=" * 80)
        report.append("")

        # Overview
        report.append("OVERVIEW")
        report.append("-" * 80)
        report.append(f"Total Files Analyzed: {stats['total_files']}")
        report.append("")

        # File Structure
        report.append("FILE STRUCTURE & IMPORTS")
        report.append("-" * 80)
        for file in sorted(self.all_files):
            component = self.components[file]
            imports = self.imports[file]
            external = self.external_deps[file]
            report.append(f"\n{file}")
            report.append(f"  Type: {component['type']}")
            if imports:
                report.append(f"  Internal Dependencies ({len(imports)}):")
                for imp in sorted(imports):
                    report.append(f"    → {imp}")
            if external:
                report.append(f"  External Dependencies ({len(external)}):")
                for ext in sorted(external):
                    report.append(f"    → {ext}")

        report.append("\n" + "=" * 80)
        report.append("DEPENDENCY STATISTICS")
        report.append("=" * 80)

        # Most imported
        if stats['most_imported']:
            report.append("\nMOST IMPORTED FILES (High Dependency Index):")
            for file, count in stats['most_imported']:
                report.append(f"  {file}: imported by {count} file(s)")

        # Most dependencies
        if stats['most_dependencies']:
            report.append("\nFILES WITH MOST DEPENDENCIES (High Coupling):")
            for file, count in stats['most_dependencies']:
                report.append(f"  {file}: {count} internal dependencies")

        # Isolated
        if stats['isolated']:
            report.append(f"\nISOLATED FILES (No internal dependencies): {len(stats['isolated'])}")
            for file in sorted(stats['isolated']):
                report.append(f"  {file}")

        # Entry points
        if stats['entry_points']:
            report.append(f"\nENTRY POINTS (Not imported anywhere): {len(stats['entry_points'])}")
            for file in sorted(stats['entry_points']):
                report.append(f"  {file}")

        report.append("\n" + "=" * 80)
        report.append("RECOMMENDATIONS FOR CODE REVIEW")
        report.append("=" * 80)

        recommendations = []

        # Check for highly coupled files
        most_deps = stats['most_dependencies']
        if most_deps:
            file, count = most_deps[0]
            if count > 5:
                recommendations.append(f"\n1. HIGH COUPLING DETECTED: {file} has {count} dependencies")
                recommendations.append("   → Consider breaking down this component or extracting shared logic")

        # Check for highly imported files
        most_imported = stats['most_imported']
        if most_imported:
            file, count = most_imported[0]
            if count > 5:
                recommendations.append(f"\n2. HIGH REUSE DETECTED: {file} is imported by {count} files")
                recommendations.append("   → This is a critical file - ensure it's well-tested and stable")

        # Entry points analysis
        if len(stats['entry_points']) <= 3 and 'App.jsx' in stats['entry_points']:
            recommendations.append(f"\n3. GOOD ENTRY POINT DESIGN: Only {len(stats['entry_points'])} entry point(s)")
            recommendations.append("   → Clear separation of concerns detected")

        # Data files check
        data_files = [f for f in self.all_files if 'data/' in f]
        if data_files:
            recommendations.append(f"\n4. DATA LAYER: {len(data_files)} data file(s) found")
            for df in data_files:
                if len(self.imports[df]) == 0:
                    recommendations.append(f"   → {df} has no dependencies (good!)")

        if recommendations:
            report.extend(recommendations)
        else:
            report.append("\nNo critical issues detected. Architecture appears sound.")

        report.append("\n" + "=" * 80)

        return "\n".join(report)

    def generate_ascii_tree(self) -> str:
        """Generate ASCII tree of dependencies"""
        from textwrap import indent

        def build_tree(file, visited=None, depth=0):
            if visited is None:
                visited = set()

            if file in visited or depth > 3:
                return ""

            visited.add(file)
            lines = []
            imports = sorted(self.imports.get(file, []))

            for i, imp in enumerate(imports):
                is_last = i == len(imports) - 1
                prefix = "└── " if is_last else "├── "
                lines.append(prefix + imp)

                # Recursively add dependencies
                sub_tree = build_tree(imp, visited.copy(), depth + 1)
                if sub_tree:
                    sub_prefix = "    " if is_last else "│   "
                    lines.append(indent(sub_tree, sub_prefix))

            return "\n".join(lines)

        result = ["DEPENDENCY TREE", "-" * 40]

        # Start from entry points
        entry_points = [f for f in self.all_files if f not in set().union(*self.imports.values())]

        for ep in sorted(entry_points):
            result.append(f"\n{ep}")
            tree = build_tree(ep)
            if tree:
                result.append(indent(tree, "  "))

        return "\n".join(result)

def main():
    src_dir = "d:/Code Placement/Projects/Dhananjay-salwe-portfolio/d-/src"

    graph = CodeReviewGraph(src_dir)
    graph.analyze()

    # Generate reports
    text_report = graph.generate_text_report()
    print(text_report)

    # Save reports
    with open("code-review-report.txt", "w", encoding="utf-8") as f:
        f.write(text_report)

    # Generate Mermaid graph
    mermaid_graph = graph.generate_mermaid_graph()
    with open("dependency-graph.mmd", "w", encoding="utf-8") as f:
        f.write(mermaid_graph)

    print("\n✓ Reports generated:")
    print("  - code-review-report.txt")
    print("  - dependency-graph.mmd")

if __name__ == "__main__":
    main()
