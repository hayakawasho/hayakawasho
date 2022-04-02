type Def = {
  id: string;
  fn: any;
};

export function create() {
  const definitions: {
    [id: string]: Def;
  } = {} as const;

  // const instances = {};

  function define<T>(id: string, fn: unknown) {
    definitions[id] = {
      id,
      fn,
    };
  }

  function require(id: string) {
    return definitions[id];
  }

  return {
    definitions,
    define,
    require,
  };
}

const ___ = create();

export const lake = ___.definitions;
export const define = ___.define;
export const require = ___.require;
