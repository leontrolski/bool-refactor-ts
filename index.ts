
import ts from "typescript";

const code = `
const isFoo = a || b
`;

const sourceFile = ts.createSourceFile(
    'example.ts',
    code,
    ts.ScriptTarget.Latest
);

function visitor(node: ts.Node) {
    if (ts.isBinaryExpression(node)) {
        if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
            const operatorToken = { ...node.operatorToken, kind: ts.SyntaxKind.AmpersandAmpersandToken }
            return { ...node, operatorToken }
        }
    }
    return ts.visitEachChild(node, visitor, undefined);
}

const transformedSourceFile = ts.visitNode(sourceFile, visitor);
const printer = ts.createPrinter();
const transformedCode = printer.printFile(transformedSourceFile as ts.SourceFile);
console.log(transformedCode);
