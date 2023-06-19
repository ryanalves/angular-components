import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { TreeNode } from './tree-node';
import {
  FormGroup,
  FormArray,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface TreeNodeValue {
  id: number;
  children?: TreeNodeValue[];
}

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeNodeComponent),
      multi: true,
    },
  ],
})
export class TreeNodeComponent
  implements ControlValueAccessor, OnChanges, AfterViewInit
{
  @Input() node!: TreeNode;
  @Input() options?: { node: TreeNode; group: FormGroup };

  @Input('isCollapsed') _isCollapsed = true;
  isCollapsed = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['node']) {
      this.options = {
        node: this.node,
        group: this.createNodeGroup(this.node),
      };
    }
  }

  ngAfterViewInit(): void {
    this.isCollapsed = this._isCollapsed;
  }

  private createNodeGroup(node: TreeNode, root: boolean = true) {
    let group: {
      id: FormControl;
      checked: FormControl;
      children?: FormArray;
    } = {
      id: new FormControl<number>(node.id),
      checked: new FormControl<boolean>(false),
    };

    let children = node.children?.map((child) =>
      this.createNodeGroup(child, false)
    );
    if (children) {
      group.children = new FormArray(children);
    }
    let nodeGroup = new FormGroup(group);

    nodeGroup.get('checked')?.valueChanges.subscribe((value) => {
      this.markAllChildren(nodeGroup, value);
    });
    nodeGroup.get('children')?.valueChanges.subscribe((value) => {
      let checkedChildren = value?.filter((el) => el.checked);
      let indeterminateChildren = value?.filter((el) => el.checked === null);
      // this.markAllChildren(nodeGroup, value);
      if (indeterminateChildren?.length) {
        nodeGroup.get('checked')?.setValue(null, { emitEvent: false });
      } else if (checkedChildren?.length == 0) {
        nodeGroup.get('checked')?.setValue(false, { emitEvent: false });
      } else if (checkedChildren?.length == value?.length) {
        nodeGroup.get('checked')?.setValue(true, { emitEvent: false });
      } else {
        nodeGroup.get('checked')?.setValue(null, { emitEvent: false });
      }
      // let isChecked = checkedChildren?.length == value?.length;
      // if (isChecked != nodeGroup.get('checked')?.value) {
      //   nodeGroup.get('checked')?.setValue(isChecked, { emitEvent: false });
      // }
    });

    return nodeGroup;
  }

  markAllChildren(group: FormGroup, checked: boolean) {
    const checkedControl = group?.get('checked') as FormControl;
    if (!checkedControl) return;
    if (checkedControl.value != checked) {
      checkedControl.setValue(checked, { emitEvent: false });
    }
    let children = group.get('children') as FormArray;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children.get(`${i}`) as FormGroup;
        this.markAllChildren(child, checked);
      }
    }
  }

  getOption(child: TreeNode, index: number) {
    return {
      node: child,
      group: this.options?.group?.get(`children.${index}`) as FormGroup,
    };
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onChange: any;
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.options?.group.valueChanges.subscribe((value) => {
      let response = this.prepareResponse(value);
      fn(response);
    });
  }

  prepareResponse(node: TreeNode): TreeNodeValue | null {
    if (!node) return null;

    if (node.checked && !node.children) return { id: node.id };

    let children = node.children
      ?.map((c) => this.prepareResponse(c))
      .filter((c) => c);

    if (children?.length == 0 && node.checked) return { id: node.id };
    if (children?.length) {
      return {
        id: node.id,
        children: children.filter((c) => c) as TreeNodeValue[],
      };
    }

    return null;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value?: TreeNode): void {
    if (this.options?.group && value) {
      this.updateLevel(this.options.group, value);
      setTimeout(() => this.onChange && this.onChange(value), 1);
    }
  }

  updateLevel(group: FormGroup, value: TreeNode) {
    let children = group.get('children') as FormArray;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const group = children.get(`${i}`) as FormGroup;
        let childValue = value.children?.find(
          (el) => el.id == group.get('id')?.value
        );
        if (childValue) this.updateLevel(group, childValue);
      }

      if (
        children.value.length == value.children?.length &&
        children.value.filter((el: TreeNode) => el.checked).length ==
          value.children?.length
      ) {
        group.get('checked')?.setValue(true);
      }
    } else {
      group.get('checked')?.setValue(true);
    }
  }
}
