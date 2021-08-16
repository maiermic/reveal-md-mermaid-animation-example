;(function (RevealMermaidAnimation) {
  const {
    attachAnimationHandlers,
    configureFragment,
    findEdgeLabelElement,
    findEdgePathElement,
    findNodeElement,
  } = RevealMermaidAnimation;

  attachAnimationHandlers.set(
    'simple',
    /**
     * @param {Element} graphElement
     */
    function attachAnimationsToSimpleGraph(graphElement) {
      const nodeA = findNodeElement('A', graphElement);
      const nodeB = findNodeElement('B', graphElement);
      const edgeAB = findEdgePathElement(nodeA, nodeB, graphElement);
      // The animation classes like fade-up add an attribute
      //   transform="translate(...)"
      // but the node already has an attribute "transform" that would be
      // overwritten. As a workaround, the fragment is added to all children
      // of the node.
      for (const child of nodeA.children) {
        configureFragment(child, {
          index: 1,
          classes: [
            'fade-up'
          ],
        })
      }
      configureFragment(edgeAB, 2);
      configureFragment(nodeB, 3);
    }
  );

  attachAnimationHandlers.set(
    1,
    /**
     * @param {Element} graphElement
     */
    function attachAnimationsToFlowChart(graphElement) {
      const nodeA = findNodeElement('A', graphElement);
      const nodeB = findNodeElement('B', graphElement);
      const nodeC = findNodeElement('C', graphElement);
      const nodeD = findNodeElement('D', graphElement);
      const nodeE = findNodeElement('E', graphElement);
      const nodeF = findNodeElement('F', graphElement);
      const edgeAB = findEdgePathElement(nodeA, nodeB, graphElement);
      const edgeLabelAB = findEdgeLabelElement(nodeA, nodeB, graphElement);
      const edgeBC = findEdgePathElement(nodeB, nodeC, graphElement);
      const edgeCD = findEdgePathElement(nodeC, nodeD, graphElement);
      const edgeLabelCD = findEdgeLabelElement(nodeC, nodeD, graphElement);
      const edgeCE = findEdgePathElement(nodeC, nodeE, graphElement);
      const edgeLabelCE = findEdgeLabelElement(nodeC, nodeE, graphElement);
      const edgeCF = findEdgePathElement(nodeC, nodeF, graphElement);
      const edgeLabelCF = findEdgeLabelElement(nodeC, nodeF, graphElement);
      configureFragment(nodeA, 1)
      configureFragment(edgeAB, 2);
      configureFragment(edgeLabelAB, 2);
      configureFragment(nodeB, 2)
      configureFragment(edgeBC, 3);
      configureFragment(nodeC, 3);
      configureFragment(edgeCD, 4);
      configureFragment(edgeLabelCD, 4);
      configureFragment(nodeD, 4);
      configureFragment(edgeCE, 4);
      configureFragment(edgeLabelCE, 4);
      configureFragment(nodeE, 4);
      configureFragment(edgeCF, 4);
      configureFragment(edgeLabelCF, 4);
      configureFragment(nodeF, 4);
    }
  );

})(RevealMermaidAnimation);
