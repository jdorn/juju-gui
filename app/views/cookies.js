/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2013 Canonical Ltd.

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

YUI.add('juju-cookies', function(Y) {
  var juju = Y.namespace('juju');

  /**
    A cookies warning handler, enabled when using analytics.
  */
  juju.Cookies = Y.Base.create('Cookies', Y.Base, [], {

  	warning: (
	    '<div class="cookie-policy">' +
	        '<div class="wrapper">' +
	            '<a href="?cp=close" class="link-cta">Close</a>' +
	            '<p>' +
	                'We use cookies to improve your experience. By your ' +
	                'continued use of this site you accept such use. ' +
	                'To change your settings please ' +
	                '<a href="/privacy-policy#cookies">' +
	                    'see our policy' +
	                '</a>.' +
	            '</p>' +
	        '</div>' +
	    '</div>'),

    /**
      Check that the user accepted cookie usage, and if not display a cookie
      usage warning.

      @method check
      @param {undefined} None
      @return {undefined} Side-effects only.
    */
    check: function() {
        if (Y.Cookie.get('_cookies_accepted') != 'true'){
            Y.one('body').prepend(this.warning);
            Y.one('.cookie-policy .link-cta').on('click', function(e){
                e.preventDefault();
                this.close();
            });
        }
    },
    

    /**
      Close the cookie usage warning and set a cookie to denote user agreement.

      @method close
      @param {undefined} None
      @return {undefined} Side-effects only.
    */
    close: function() {
        Y.one('.cookie-policy').setStyle('display','none');
        this.setCookie();
        Y.Cookie.set('_cookies_accepted', 'true',
        	{expires: new Date('January 12, 2025')});
    }

  });

}, '0.1.0', {
  requires: [
  	'cookie'
  ]
});
