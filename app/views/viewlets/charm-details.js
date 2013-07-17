/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2012-2013 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';


YUI.add('viewlet-charm-details', function(Y) {
  var browserViews = Y.namespace('juju.browser.views'),
      ns = Y.namespace('juju.viewlets'),
      templates = Y.namespace('juju.views').Templates,
      models = Y.namespace('juju.models');

  ns.charmDetails = {
    name: 'charmDetails',
    slot: 'left-hand-panel',
    //templateWrapper: templates['left-breakout-panel'],
    render: function(charm, viewContainerAttrs) {
      //this.container = Y.Node.create('<div />');//this.templateWrapper());

      var store = viewContainerAttrs.store;
      store.charm(charm.get('storeId'), {
        success: function(data) {
          var storeCharm = new models.BrowserCharm(data.charm);
          var charmView = new browserViews.BrowserCharmView({
            charm: storeCharm,
            forInspector: true,
            renderTo: this.container.get('parentNode'),
            store: store
          });
          charmView.render();
        },
        failure: function(data, request) {
          var charmView = new browserViews.BrowserCharmView({
            charm: charm,
            forInspector: true,
            renderTo: this.container.get('parentNode'),
            store: store
          });
          charmView.render();
        },
      }, this);
      return Y.Node.create('<div>Loading...</div>');
    }
  };
}, '0.0.1', {
  requires: [
    'node',
    'subapp-browser-charmview',
    'juju-charm-models',
    'juju-view'
  ]
});
