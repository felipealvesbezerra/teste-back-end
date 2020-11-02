import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from '~/pages/List';
import Store from '~/pages/Store';
import Update from '~/pages/Update';
import Delete from '~/pages/Delete';
import NotFound from '~/pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/store" component={Store} />
      <Route path="/update" component={Update} />
      <Route path="/delete" component={Delete} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
