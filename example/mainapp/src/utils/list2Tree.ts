interface List {
  id: number;
  parent_id: number;
  children?: List[];
}

export function list2Tree(list: List[]) {
  let map: Record<string, number> = {},
    node: List,
    roots: List[] = [],
    i: number;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent_id !== 0) {
      // if you have dangling branches check that map[node.parent_id] exists
      if (!list[map[node.parent_id]].children) {
        list[map[node.parent_id]].children = [];
      }
      list[map[node.parent_id]]?.children?.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
