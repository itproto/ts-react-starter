const parseBody = (val: string): string[] => {
  const str = val.replace(/"/gm, '\\"').replace(/\$_(\d)_/gm, '${$1}');
  const temp = str.indexOf('${0}') ? str : str + '\n${0}';
  return temp
    .split('\n')
    .map(a => a.replace(/^\s+$/g, ''))
    .map(a =>
      a.replace(/^[\s]+/gm, x => new Array(x.length / 2 + 1).join('\\t'))
    );
};

const parseMeta = (content: string) => {
  return {
    name: 'Sample',
    prefix: `itp-smple`,
    description: 'Sample desc'
  };
};

export const toSnippet = (content: string) => {
  const { name, prefix, description } = parseMeta(content);
  const body = parseBody(content);

  const snip = {
    [name]: {
      prefix,
      description,
      body
    }
  };
  return JSON.stringify(snip, null, 2);
};
