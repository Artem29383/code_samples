export const routes: Route<RootState>[] = [
  {
    path: Routes.ui,
    exact: true,
    component: UI,
    cache: false,
    auth: true,
    layout: 'default',
    title: 'UI',
    sagasToRun: [],
    config: {},
  },
  {
    path: [Routes.properties, Routes.home],
    exact: true,
    component: Properties,
    cache: false,
    auth: true,
    layout: 'default',
    title: 'Buy',
    sagasToRun: [],
    config: {},
  }]
  
  const mainAppRoutes = routes.filter(({ layout }) => layout === 'default');
  ...
  
  <Switch>
      <Route exact path={_flatten(mainAppRoutes.map(({ path }) => path))}>
        <Layout>
          <Switch>
            {mainAppRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </Layout>
      </Route>
    ...
  </Switch>
