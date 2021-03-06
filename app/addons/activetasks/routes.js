// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
  "app",
  "api",
  "addons/activetasks/resources",
  "addons/activetasks/views"
],

function (app, FauxtonAPI, Activetasks, Views) {

  var ActiveTasksRouteObject = FauxtonAPI.RouteObject.extend({
    layout: "with_tabs_sidebar",

    routes: {
      "activetasks/:id": "defaultView",
      "activetasks": "defaultView"
    },

    events: {
      "route:changeFilter": "changeFilter",
    },

    selectedHeader: 'Active Tasks',

    crumbs: [
      {"name": "Active tasks", "link": "activetasks"}
    ],

    apiUrl: function () {
      return [this.allTasks.url("apiurl"), this.allTasks.documentation];
    },

    roles: ["_admin"],

    initialize: function () {
      this.allTasks = new Activetasks.AllTasks();
      this.search = new Activetasks.Search();
    },

    defaultView: function () {
      this.setView("#dashboard-lower-content", new Views.View({
        collection: this.allTasks,
        currentView: "all",
        searchModel: this.search
      }));

      this.setView("#sidebar-content", new Views.TabMenu({}));

      this.headerView = this.setView("#dashboard-upper-content", new Views.TabHeader({
        searchModel: this.search
      }));
    },

    changeFilter: function (filterType) {
      this.search.set('filterType', filterType);
    }
  });

  Activetasks.RouteObjects = [ActiveTasksRouteObject];

  return Activetasks;
});
