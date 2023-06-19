export interface TreeNode {
  id: any;
  title?: string;
  checked?: boolean;
  children?: TreeNode[];
}

export interface TreeNodeValue {
  id: any;
  children?: TreeNodeValue[];
}
