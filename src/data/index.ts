export const pkgManagers = {
  npm: {
    cmd: 'i',
  },
  yarn: {
    cmd: 'add',
  },
  pnpm: {
    cmd: 'add',
  },
};

export const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
  },
  {
    name: 'name',
    required: true,
    label: 'Package Name',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: false,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Description',
    field: 'description',
    sortable: false,
  },
  {
    name: 'repo',
    align: 'center',
    label: 'Repo',
    field: 'repo',
    sortable: false,
    type: 'link',
  },
  {
    name: 'copy',
    label: 'Copy Command',
    field: 'copy',
  },
];
