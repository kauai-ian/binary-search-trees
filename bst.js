let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// merge and sort function for array
function helper(left, right) {
  let arrSorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arrSorted.push(left.shift());
    } else {
      arrSorted.push(right.shift());
    }
  }
  return [...arrSorted, ...left, ...right];
}
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return helper(left, right);
}
// check for duplicates and remove
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
//node factory to create nodes
const node = function (data, right = null, left = null) {
  return {
    nodeData: data,
    rightChild: right,
    leftChild: left,
  };
};

//tree factory which accepts an array and returns the root
const tree = function (arr) {
  let root = null;
  if (root === null) {
    root = buildTree(arr);
  }

  // Build tree function, returns a new object . Sort and remove duplicates.
  function buildTree(arr) {
    let sortedArr = mergeSort(removeDuplicates(arr));
    if (sortedArr.length < 1) return null;

    const rootIndex = parseInt(sortedArr.length / 2);
    let newNode = node(sortedArr[rootIndex]);

    //recursive calls on the left and right branches
    newNode.leftChild = buildTree(sortedArr.slice(0, rootIndex));
    newNode.rightChild = buildTree(sortedArr.slice(rootIndex + 1));
    // console.log(typeof(newNode), newNode)
    return newNode; // not returning an object because newNode is already a collection of objects (nodelist?)
  }

  //pretty print
  // node has to equal root to be so that everything is root.right, root.left, etc.
  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.nodeData}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  // insert
  // start at root. take in a value to insert, and set the current node to be the root node.
  //check the value to be inserted with the value of the current node we are in.
  // if x is less than value move to the left subtree (recur) otherwise, move to the right subtree (recur)
  //once the leaf node is reached, insert x to its right or left based on the relation between x and the leaf nodes value
  function insert(value, currentNode = root) {
    if (currentNode === null) return node(value); // if root is empty, a new root is created
    if (currentNode === value) return; // if the number is the same as whats being inserted, then return
    if (value < currentNode.nodeData) {
      currentNode.leftChild = insert(value, currentNode.leftChild); // if current node is greater than the value to be inserted, go left, and recursively call
    } else if (value > currentNode.nodeData) {
      currentNode.rightChild = insert(value, currentNode.rightChild);
    }
    return currentNode;
  }

  //remove
  // start at the root. Take in a value to be removed. And set current node to root.
  // check the value to be removed with the value of the current node we are in.
  // if x is equal to the value of the current node, then remove node (seperate operation).
  // if x is less than value, move left. Otherwise move right. (recur recur)
  // once the leaf node is reached, remove the node.
  function remove(value, currentNode = root) {
    if (currentNode === null) return currentNode; // basecase
    if (currentNode.nodeData === value) {
      // value matches
      currentNode = deleteNode(currentNode);
    }
    if (currentNode.nodeData > value) {
      // traverse down tree
      currentNode.leftChild = remove(value, currentNode.leftChild);
    } else {
      currentNode.rightChild = remove(value, currentNode.rightChild);
    }
    return currentNode;
  }

  // delete
  // we want to assign the item to null
  // if the node has both left and right children
  // find the successor (in order) of the node from its right branch
  // replace the value of the current node with the value of its successor (in order)
  // remove the inorder successor from original position in the right branch
  // return the node that is to be removed
  // if the node has only one child, find a replacement node which is the non-null child (if exists)
  // remove the reference to the node
  // return the replacement node to adjust the tree structure
  function deleteNode(node) {
    if (node.leftChild !== null && node.rightChild !== null) {
      // 2 children
      const successorNode = inOrderSuccessor(node.rightChild);
      node.nodeData = successorNode.nodeData;
      node.rightChild = remove(successorNode.nodeData, node.rightChild);
      return node;
    } else {
      const replacementNode = node.rightChild || node.leftChild; // 1 child
      node = null;
      return replacementNode;
    }
  }

  // utility function inorder traversal
  // traverses the tree toward the leftmost node from the given node, which represents the inorder successor in a BST
  // we are inserting the root as parameter
  // loop through the left node from the root node
  // return the leftmost node which is the inorder successor
  function inOrderSuccessor(node) {
    let currentNode = node;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  // find
  // accepts a value and returns the node w/ given value
  // start at root node. if no root node, search is over.
  // check if value of new node is the value we are looking for,
  // if not, is the value greater or less than the value of the root to confirm direction to go
  // if greater, check if node to the right, if not, search over.
  // if yes, move to that node, and repeat.
  // if its less, cehck if node to left, if not search over.
  // if yes, move to that node, and repeat.
  function find(value, currentNode = root) {
    while (currentNode !== null) {
      if (value === currentNode.nodeData) {
        return currentNode;
      } else if (value < currentNode.nodeData) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return undefined; // node w/ given data not found
  }

  function findRec(value, currentNode = root) {
    if (currentNode === null || value === currentNode.nodeData) {
      return currentNode;
    } else if (value < currentNode.nodeData) {
      // console.log(currentNode);
      return findRec(value, currentNode.leftChild);
    } else {
      // console.log(currentNode);
      return findRec(value, currentNode.rightChild);
    }
  }

  // levelOrder (breadth first search, visits children before grandchildren)
  // accepts a random callback function as its parameter. Traverse in breadth first level order, providing each node as an argument ot the callback.
  // As a result the callback will perform an operation on each node following the order in which they are traversed. Level Order may be implemented using either iteration or recursion. The method should return an array of values if no callback is given as an argument.
  // use array as a queue to keep track of all child nodes to traverse and to add new ones to the list.
  // start w/ root node. Enqueue it. Then iteratively dequeue nodes, performing a callback operation or adding the node value to the result array.
  // for each dequeued node, it checks left and right children, enque children if they exist.
  // if no callback function, then return array result
  function levelOrder(callback) {
    const queue = [root]; // start w/ root
    const result = []; // new list to be added to

    while (queue.length > 0) {
      // console.log(result, "added to result");
      const currentNode = queue.shift(); // dequeue the node (removes first node and returns removed node)
      if (callback) {
        callback(currentNode.nodeData);
      } else {
        result.push(currentNode.nodeData);
      }
      //enqueue children
      if (currentNode.leftChild) {
        queue.push(currentNode.leftChild);
      }
      if (currentNode.rightChild) {
        queue.push(currentNode.rightChild);
      }
    }
    return result;
  }

  function levelOrderRec(callback, arr = [root], result = []) {
    if (arr.length === 0) return result;
    const nextArr = []; // store nodes to be processed
    for (const node of arr) {
      // process nodes in current level
      if (callback) {
        callback(node.nodeData);
      } else {
        result.push(node.nodeData);
      }
      if (node.leftChild) {
        nextArr.push(node.leftChild);
      }
      if (node.rightChild) {
        nextArr.push(node.rightChild);
      }
    }
    return levelOrderRec(callback, nextArr, result);
  }

  // inOrder
  // left tree first, then root node, then right tree
  // follow steps until root !==null.
  // inorder(root -> left)
  // write root -> data
  // inorder(root -> right)
  // end loop
  function inOrderRec(callback, currentNode = root, result = []) {
    if (currentNode === null) return;

    inOrderRec(callback, currentNode.leftChild, result);
    if (callback) {
      callback(currentNode.nodeData);
    } else {
      result.push(currentNode.nodeData);
    }
    inOrderRec(callback, currentNode.rightChild, result);

    if (result.length > 0) return result; // if the array isnt empty, return array
  }

  function inOrderIt(callback, currentNode = root, result = []) {
    const stack = [];
    while (currentNode || stack.length > 0) {
      while (currentNode !== null) {
        stack.push(currentNode); // traverse left and push all nodes encountered onto stack
        currentNode = currentNode.leftChild;
      }
      currentNode = stack.pop(); // pop and process using callback or push to result
      if (callback) {
        callback(currentNode.nodeData);
      } else {
        result.push(currentNode.nodeData);
      }
      currentNode = currentNode.rightChild; // traverse right
    }
    return result;
  }

  // preOrder
  // root, left, right. (each nodes value is processed before visiting its children)
  // follow steps until root !== null.
  // write root -> data
  // preorder(root -> left)
  // preorder(root -> right)
  function preOrderRec(callback, currentNode = root, result = []) {
    if (currentNode === null) return;

    if (callback) {
      callback(currentNode.nodeData);
    } else {
      result.push(currentNode.nodeData);
    }
    preOrderRec(callback, currentNode.leftChild, result);
    preOrderRec(callback, currentNode.rightChild, result);

    if (result.length > 0) return result;
  }

  function preOrderIt(callback, currentNode = root, result = []) {
    const stack = [];
    while (currentNode || stack.length > 0) {
      if (currentNode !== null) {
        if (callback) {
          callback(currentNode.nodeData);
        } else {
          result.push(currentNode.nodeData);
        }
        stack.push(currentNode.rightChild); // right child first, then left (last in first out LIFO)
        currentNode = currentNode.leftChild;
      } else {
        currentNode = stack.pop(); // move to right
      }
    }
    return result;
  }

  // postOrder
  // left, right, root. (each nodes value is processed before visiting its children)
  // follow steps until root !== null.
  // preorder(root -> left)
  // preorder(root -> right)
  // write root -> data
  function postOrderRec(callback, currentNode = root, result = []) {
    if (currentNode === null) return;

    postOrderRec(callback, currentNode.leftChild, result);
    postOrderRec(callback, currentNode.rightChild, result);
    if (callback) {
      callback(currentNode.nodeData);
    } else {
      result.push(currentNode.nodeData);
    }
    if (result.length > 0) return result;
  }

  function postOrderIt(callback, currentNode = root, result = []) {
    const stack = [];
    let prev = null; // tracks last visited node

    while (currentNode || stack.length > 0) {
      if (currentNode !== null) {
        stack.push(currentNode); // push to stack and set left child to new current node.
        currentNode = currentNode.leftChild;
      } else {
        let peekNode = stack[stack.length - 1];
        if (peekNode.rightChild && prev !== peekNode.rightChild) {
          // if right child hasnt been visited yet, pop then process.
          currentNode = peekNode.rightChild;
        } else {
          currentNode = stack.pop();
          if (callback) {
            callback(currentNode.nodeData);
          } else {
            result.push(currentNode.nodeData);
          }
          prev = currentNode;
          currentNode = null; // reset after processing
        }
      }
    }
    return result;
  }

  // height
  // the distance from root to leaf nodes
  // start on the left and recur
  // go right and recur
  // returns largest of the subtrees
  function heightRec(currentNode = root) {
    if (currentNode === null) return 0;

    const leftHeight = heightRec(currentNode.leftChild);
    const rightHeight = heightRec(currentNode.rightChild);
    // console.log(rightHeight)

    if (leftHeight > rightHeight) {
      return leftHeight + 1; // adding 1 represents the current node
    } else {
      return rightHeight + 1;
    }
  }

  function getHeight(currentNode){ // calc the heigh by recursively computing the height of left and right
    if(currentNode === null) return 0
    return Math.max(getHeight(currentNode.leftChild), getHeight(currentNode.rightChild))
  }

  // depth
  // the number of edges in the path from a given node to the trees root node
  // check to see if the value equals current value, if so return the edges count
  // cehck if left tree value is greater than current value, if so recur and add 1 to edges each time
  // repeat on right subtree
  function depthRec(value, currentNode = root, edges = 0) {
    if (currentNode === null) return -1; // if value not found return -1
    if (currentNode.nodeData === value) return edges;
    if (currentNode.nodeData > value) {
      return depthRec(value, currentNode.leftChild, edges + 1);
    } else {
      return depthRec(value, currentNode.rightChild, edges + 1);
    }
  }

  // is balanced?
  function isBalanced(currentNode = root) {
if (currentNode === null) return true
const leftHeight = getHeight(currentNode.leftChild)
const rightHeight = getHeight(currentNode.rightChild)
console.log(`${leftHeight} - ${rightHeight}`)
  if((leftHeight - rightHeight) <= 1 && isBalanced(currentNode.leftChild) && isBalanced(currentNode.rightChild)){
    return true
  }
return false
}
  

  return {
    buildTree,
    prettyPrint,
    insert,
    remove,
    deleteNode,
    inOrderSuccessor,
    find,
    findRec,
    levelOrder,
    levelOrderRec,
    inOrderRec,
    inOrderIt,
    preOrderRec,
    preOrderIt,
    postOrderRec,
    postOrderIt,
    heightRec,
    depthRec,
    isBalanced,
  };
};

const treeRoot = tree(testArr);
// treeRoot.prettyPrint();
treeRoot.insert(100);
treeRoot.insert(200);
treeRoot.insert(300);
treeRoot.insert(400);
treeRoot.insert(6);
// treeRoot.prettyPrint();
treeRoot.remove(100);
treeRoot.prettyPrint();
// console.log(treeRoot.find(200))
console.log(treeRoot.findRec(400));

function logNodeValue(nodeData) {
  console.log(nodeData);
}
console.log(`Level order iterative: ${treeRoot.levelOrder()}`);
console.log(`Level order recursion: ${treeRoot.levelOrderRec()}`);

console.log(`In order recursion: ${treeRoot.inOrderRec()}`);
console.log(`In order iterative: ${treeRoot.inOrderIt()}`);

console.log(`Pre order recursion: ${treeRoot.preOrderRec()}`);
console.log(`Pre order iterative: ${treeRoot.preOrderIt()}`);

console.log(`Post order recursion: ${treeRoot.postOrderRec()}`);
console.log(`Post order iterative: ${treeRoot.postOrderIt()}`);

console.log(`Height: ${treeRoot.heightRec()}`);
console.log(`Depth of 200: ${treeRoot.depthRec(200)}`);

console.log(treeRoot.isBalanced())
