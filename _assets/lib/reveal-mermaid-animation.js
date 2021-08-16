;(function (RevealMermaid) {
  /**
   * @param {string} name
   * @param {Element} graphElement
   * @returns {Element}
   */
  function findNodeElement(name, graphElement) {
    const node = graphElement.querySelector('.node#' + name);
    if (!node) {
      throw Error('Could not find node ' + name);
    }
    return node;
  }

  /**
   * @param {(string|Element)} startNode
   * @param {(string|Element)} endNode
   * @param {Element} graphElement
   * @returns {Element}
   */
  function findEdgePathElement(startNode, endNode, graphElement) {
    if (startNode instanceof Element) {
      startNode = startNode.id;
    }
    if (endNode instanceof Element) {
      endNode = endNode.id;
    }
    const edgePath = graphElement.querySelector([
      `.edgePath`,
      `.LS-${startNode}`,
      `.LE-${endNode}`,
    ].join(''));
    if (!edgePath) {
      throw Error(`Could not find edgePath: start=${startNode} end=${endNode}`);
    }
    return edgePath;
  }

  /**
   * @param {(string|Element)} startNode
   * @param {(string|Element)} endNode
   * @param {Element} graphElement
   * @returns {Element}
   */
  function findEdgeLabelElement(startNode, endNode, graphElement) {
    if (startNode instanceof Element) {
      startNode = startNode.id;
    }
    if (endNode instanceof Element) {
      endNode = endNode.id;
    }
    const edgeLabelTextElement =
      graphElement.querySelector(`#L-L-${startNode}-${endNode}`);
    if (!edgeLabelTextElement) {
      throw Error(`Could not find edgeLabelTextElement: start=${startNode} end=${endNode}`);
    }
    const edgeLabel = edgeLabelTextElement.parentElement.closest('.edgeLabel');
    if (!edgeLabel) {
      throw Error(`Could not find edgeLabel: start=${startNode} end=${endNode}`);
    }
    return edgeLabel;
  }

  /**
   * @param {Element} element
   * @param {(number | {index?: number, classes?: string[]})} options
   */
  function configureFragment(element, options = {}) {
    element.classList.add('fragment');
    if (typeof options === 'object') {
      if (options.index) {
        element.setAttribute('data-fragment-index', String(options.index));
      }
      if (options.classes) {
        element.classList.add(...options.classes);
      }
    } else {
      element.setAttribute('data-fragment-index', String(options));
    }
  }

  /**
   * @param {string} mermaidAnimationCode
   */
  function parseMermaidAnimationDefinition(mermaidAnimationCode) {
    return mermaidAnimationCode.split('\n')
      .flatMap(parseLine)

    /**
     * @param {string} line
     * @param {number} index
     * @return {({fragmentIndex: number, id: string, type: string}|{fragmentIndex: number, startNodeId: string, type: string, endNodeId: string})[]}
     */
    function parseLine(line, index) {
      const fragmentIndex = index + 1;
      return line.trim()
        .split(/\s+/)
        .map(elementCode => parseElementCode(elementCode, fragmentIndex));

      /**
       * @param {string} elementCode
       * @param {number} fragmentIndex
       * @return {{fragmentIndex: number, id: string, type: string}|{fragmentIndex: number, startNodeId: string, type: string, endNodeId: string}}
       */
      function parseElementCode(elementCode, fragmentIndex) {
        const [startNodeId, endNodeId] = elementCode.trim().split('-->');
        if (!endNodeId) {
          return {
            fragmentIndex,
            type: 'node',
            id: startNodeId,
          }
        }
        return {
          fragmentIndex,
          type: 'edge',
          startNodeId,
          endNodeId,
        }
      }
    }
  }

  /**
   * @param {Element} graphElement
   */
  function attachAnimationsFromCodeBlockDefinition(graphElement) {
    const parentSlideElement = graphElement.closest('.slides > section');
    const mermaidAnimationElement = parentSlideElement.querySelector('.mermaid-animation');
    const defs =
      parseMermaidAnimationDefinition(mermaidAnimationElement.innerText);
    for (const def of defs) {
      switch (def.type) {
        case 'node':
          configureFragment(
            findNodeElement(def.id, graphElement),
            def.fragmentIndex);
          break;
        case 'edge':
          configureFragment(
            findEdgePathElement(def.startNodeId, def.endNodeId, graphElement),
            def.fragmentIndex);
          configureFragment(
            findEdgeLabelElement(def.startNodeId, def.endNodeId, graphElement),
            def.fragmentIndex);
          break;
        default:
          throw Error('Unknown mermaid animation definition type ' + def.type);
      }
    }
    mermaidAnimationElement.style.display = 'none';
  }

  const attachAnimationHandlers = new Map();

  RevealMermaid.addEventListener(
    'attached',
    /**
     * @param {CustomEvent} event
     */
    function attachAnimations(event) {
      console.log('attach animations');
      const {graphIndex, graphElement} = event.detail;
      const graphNameElement =
        graphElement.closest('*[data-mermaid-graph-name]');
      if (graphNameElement) {
        const graphName =
          graphNameElement.getAttribute('data-mermaid-graph-name');
        if (attachAnimationHandlers.has(graphName)) {
          attachAnimationHandlers.get(graphName)(graphElement);
          return;
        }
      }
      if (attachAnimationHandlers.has(graphIndex)) {
        attachAnimationHandlers.get(graphIndex)(graphElement);
        return;
      }
      attachAnimationsFromCodeBlockDefinition(graphElement);
    });

  // export
  window.RevealMermaidAnimation = {
    attachAnimationHandlers,
    configureFragment,
    findEdgeLabelElement,
    findEdgePathElement,
    findNodeElement,
  };
})(RevealMermaid);
