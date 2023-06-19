import { Component, OnInit } from '@angular/core';
import { TreeNode, TreeNodeValue } from 'src/app/components/tree-node/tree-node';
import { FormControl } from '@angular/forms';

const ESTRUTURA: TreeNode = {
  id: 1,
  title: 'Projeto arquitetônico do zero',
  children: [
    {
      id: 2,
      title: 'À iniciar',
      children: [
        {
          id: 3,
          title: 'Atendimento inicial - Visita/entrevista (escritório/obra)',
          children: [
            {
              id: 4,
              title: 'Item 1',
            },
            {
              id: 5,
              title: 'Item 2',
            },
            {
              id: 6,
              title: 'Item 3',
            },
            {
              id: 7,
              title: 'Item 4',
            },
          ],
        },
        {
          id: 8,
          title: 'Plano de negócio',
          children: [
            {
              id: 9,
              title: 'Item 5',
            },
            {
              id: 10,
              title: 'Item 1',
            },
            {
              id: 11,
              title: 'Item 6',
            },
            {
              id: 12,
              title: 'Item 7',
            },
            {
              id: 13,
              title: 'Item 8',
            },
          ],
        },
      ],
    },
  ],
};

const VALUES: TreeNodeValue = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 3,
          children: [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }],
        },
        {
          id: 8,
          children: [{ id: 9 }, { id: 10 }, { id: 12 }, { id: 13 }],
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-tree-node-showcase',
  templateUrl: './tree-node-showcase.component.html',
  styleUrls: ['./tree-node-showcase.component.scss'],
})
export class TreeNodeShowcaseComponent implements OnInit {
  node: TreeNode = ESTRUTURA;

  values: TreeNode = VALUES;

  treeNodeControl = new FormControl(this.values);
  response: any = null;

  constructor() {}

  ngOnInit(): void {
    this.treeNodeControl.valueChanges.subscribe((values) => {
      this.response = values;
    });
  }
}
