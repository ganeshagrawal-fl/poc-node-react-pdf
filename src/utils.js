const errorPathBuilder = (path) => {
  return path
    .map((p, idx) =>
      Number.isFinite(p) ? `[${p}]` : idx == 0 ? `${p}` : `.${p}`
    )
    .join("");
};

export const validationErrorBuilder = (err) => {
  console.log({
    issues: JSON.stringify(err.issues),
    errors: JSON.stringify(err.errors),
  });
  return err.issues.reduce(
    (acc, error) => ({
      ...acc,
      [errorPathBuilder(error.path)]: error.message,
    }),
    {}
  );
};
