const useInput = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);
  const changeHandler = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const changeAutoCompleteHandler = useCallback(
    (e, values) => {
      setValue(values);
    },
    [setValue]
  );

  const setDefaultHandle = useCallback(defaultValue => {
    setValue(defaultValue);
  }, []);

  const reset = useCallback(() => setValue(''), [setValue]);

  return {
    value,
    setValue: changeHandler,
    setDefaultHandle,
    reset,
    changeAutoCompleteHandler,
  };
};
    
    export default () => {
  const [{ width, height }, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const resizeHandler = _debounce(
      () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      },
      500,
      { leading: false }
    );

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return { width, height } as const;
};
