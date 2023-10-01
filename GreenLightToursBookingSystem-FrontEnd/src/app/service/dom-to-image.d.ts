declare module 'dom-to-image' {
    const toPng: (node: Node) => Promise<string>;
    export { toPng };
  }
  