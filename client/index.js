import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import fetch from 'unfetch';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './app';
import { HomeNavBar, NavBar } from './components';
import { JobList, LoadMoreButton } from './containers';
import linkState from './linkState';


const store = createStore(reducers);
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: linkState.defaults,
  resolvers: linkState.resolvers,
});
const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: `${process.env.HOST_URL}/graphql`, fetch,
    }),
  ]),
  cache,
});

const Root = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router history={browserHistory}>
        <Route path="/" components={NavBar}>
          <IndexRoute component={App} />
          <Route path="/results" components={JobList}>
            <IndexRoute component={LoadMoreButton} />
          </Route>
        </Route>
        
      </Router>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
