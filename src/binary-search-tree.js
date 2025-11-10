const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.treeRoot) {
      this.treeRoot = newNode;
      return;
    }

    let currentNode = this.treeRoot;

    while (true) {
      if (data < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(data) {
    let currentNode = this.treeRoot;

    while (currentNode) {
      if (data === currentNode.value) {
        return currentNode;
      }

      if (data < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.value) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const minRight = this._findMin(node.right);
      node.value = minRight.value;
      node.right = this._removeNode(node.right, minRight.value);
      return node;
    }

    if (data < node.value) {
      node.left = this._removeNode(node.left, data);
    } else {
      node.right = this._removeNode(node.right, data);
    }

    return node;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (!this.treeRoot) {
      return null;
    }

    let currentNode = this.treeRoot;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  max() {
    if (!this.treeRoot) {
      return null;
    }

    let currentNode = this.treeRoot;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }
}

module.exports = {
  BinarySearchTree,
};