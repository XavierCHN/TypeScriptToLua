import * as ts from "typescript";

export class TSHelper {
    // Get all children of a node, required until microsoft fixes node.getChildren()
    static getChildren(node: ts.Node): ts.Node[] {
        const children = [];
        node.forEachChild(child => {
            children.push(child);
        });
        return children;
    }

    // Get children filtered by function and cast to predefined type
    static getChildrenOfType<T>(node: ts.Node, typeFilter: (node: ts.Node) => boolean): T[] {
        return <T[]><any>this.getChildren(node).filter(typeFilter);
    }

    static getFirstChildOfType<T>(node: ts.Node, typeFilter: (node: ts.Node) => boolean): T {
        return this.getChildrenOfType<T>(node, typeFilter)[0];
    }

    // Reverse lookup of enum key by value
    static enumName(needle, haystack) {
        for (var name in haystack) {
            if (haystack[name] == needle) {
                return name;
            }
        }
        return "unknown"
    }

    static isValueType(node: ts.Node): boolean {
        return ts.isIdentifier(node) || ts.isLiteralExpression(node) || ts.isArrayLiteralExpression(node) || ts.isObjectLiteralExpression(node);
    }

    static isArrayType(type: ts.Type): boolean {
        return type.flags == ts.TypeFlags.Object && (<ts.ObjectType>type).symbol.escapedName == "Array";
    }
}