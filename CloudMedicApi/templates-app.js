angular.module('templates-app', ['admin/admin.tpl.html', 'app.confirm.tpl.html', 'app.error.tpl.html', 'careteams/careteams.add.tpl.html', 'careteams/careteams.update.tpl.html', 'login/login.forgot.password.tpl.html', 'login/login.forgot.username.tpl.html', 'login/login.resendVerify.tpl.html', 'login/login.resetPassword.tpl.html', 'login/login.tpl.html', 'medications/medications.add.tpl.html', 'medications/medications.tpl.html', 'navbar.tpl.html', 'patient/patient.tpl.html', 'prescriptions/prescriptions.add.tpl.html', 'prescriptions/prescriptions.tpl.html', 'prescriptions/prescriptions.update.tpl.html', 'profile/profile.password.tpl.html', 'profile/profile.update.tpl.html', 'provider/history.tpl.html', 'provider/provider.add.tpl.html', 'provider/provider.tpl.html', 'register/register.tpl.html', 'sso/sso.login.tpl.html', 'supporter/supporter.add.tpl.html', 'supporter/supporter.meds.tpl.html', 'supporter/supporter.tpl.html']);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<tabset ng-init=\"getPatients(patientsPage)\">\n" +
    "    <button class=\"btn btn-sm btn-default pull-right\" ng-show=\"ProviderTabActive\" ng-click=\"createProvider()\">Add Physician/Nurse</button>\n" +
    "    <button class=\"btn btn-sm btn-default pull-right\" ng-show=\"SupporterTabActive\" ng-click=\"createSupporter()\">Add Supporter</button>\n" +
    "\n" +
    "    <tab heading=\"Patients\" id=\"patient-tab\" ng-click=\"getPatients(patientsPage)\">\n" +
    "        <table id=\"patient-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPatient=['LastName', 'FirstName']; reverseSortPatient = !reverseSortPatient\">\n" +
    "                            Full Name\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPatient == ['LastName', 'FirstName']\" class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPatient ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPatient='UserName'; reverseSortPatient = !reverseSortPatient\">\n" +
    "                            UserName\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPatient == 'UserName'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPatient ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-4\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPatient='Email'; reverseSortPatient = !reverseSortPatient\">\n" +
    "                            Email\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPatient == 'Email'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPatient ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-4\"></th>\n" +
    "                    <th style=\"width:69px;\">Remove</th>\n" +
    "                    <th style=\"width:69px;\">CareTeam</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"patient in patients | orderBy:orderByFieldPatient:reverseSortPatient | filter:{Roles:'Patient'}\">\n" +
    "                    <td>{{patient.LastName}}, {{patient.FirstName}}</td>\n" +
    "                    <td>{{patient.UserName}}</td>\n" +
    "                    <td>{{patient.Email}}</td>\n" +
    "                    <td></td>\n" +
    "                    <td align=\"center\">\n" +
    "                        <button id=\"remove-patient\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"removeUser(patient)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                    <td align=\"center\">\n" +
    "                        <button id=\"create-careteam\"class=\"btn btn-primary btn-xs\" ng-click=\"createCareTeam(patient)\">\n" +
    "                            <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"row text-center\">\n" +
    "            <button id=\"prev-ptnt-pg\" class=\"btn btn-lg\" ng-click=\"getPatients(patientsPage - 1)\" ng-hide=\"!hasPrev\">\n" +
    "                <<\n" +
    "            </button>\n" +
    "            <button id=\"next-ptnt-pg\" class=\"btn btn-lg\" ng-click=\"getPatients(patientsPage + 1)\" ng-hide=\"!hasNext\">\n" +
    "                >>\n" +
    "            </button>\n" +
    "            <div>{{patientsPage}} of {{numPages}}</div>\n" +
    "        </div>\n" +
    "    </tab>\n" +
    "    <tab heading=\"Physicians\" id=\"physician-tab\" ng-click=\"getPhysicians(physiciansPage)\">\n" +
    "        <table id=\"physician-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPhysician=['LastName', 'FirstName']; reverseSortPhysician = !reverseSortPhysician\">\n" +
    "                            Full Name\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPhysician == ['LastName', 'FirstName']\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPhysician ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPhysician='UserName'; reverseSortPhysician = !reverseSortPhysician\">\n" +
    "                            UserName\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPhysician == 'UserName'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPhysician ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-4\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldPhysician='Email'; reverseSortPhysician = !reverseSortPhysician\">\n" +
    "                            Email\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldPhysician == 'Email'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortPhysician ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center\" style=\"width:69px;\">\n" +
    "                        Remove\n" +
    "                    </th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"physician in physicians | orderBy:orderByFieldPhysician:reverseSortPhysician\">\n" +
    "                    <td>{{physician.LastName}}, {{physician.FirstName}}</td>\n" +
    "                    <td>{{physician.UserName}}</td>\n" +
    "                    <td>{{physician.Email}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"remove-physician\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"removeUser(physician)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"row text-center\">\n" +
    "            <button id=\"prev-phys-pg\" class=\"btn btn-lg\" ng-click=\"getPhysicians(physiciansPage - 1)\" ng-hide=\"!hasPrev\" ng-disabled=\"isLoading\">\n" +
    "                <<\n" +
    "            </button>\n" +
    "            <button id=\"next-phys-pg\" class=\"btn btn-lg\" ng-click=\"getPhysicians(physiciansPage + 1)\" ng-hide=\"!hasNext\" ng-disabled=\"isLoading\">\n" +
    "                >>\n" +
    "            </button>\n" +
    "            <div>{{physiciansPage}} of {{numPages}}</div>\n" +
    "        </div>\n" +
    "    </tab>\n" +
    "    <tab heading=\"Nurses\" id=\"nurse-tab\" ng-click=\"getNurses(nursesPage)\">\n" +
    "        <table id=\"nurse-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldNurse=['LastName', 'FirstName']; reverseSortNurse = !reverseSortNurse\">\n" +
    "                            Full Name\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldNurse == ['LastName', 'FirstName']\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortNurse ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldNurse='UserName'; reverseSortNurse = !reverseSortNurse\">\n" +
    "                            UserName\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldNurse == 'UserName'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortNurse ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-4\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldNurse='Email'; reverseSortNurse = !reverseSortNurse\">\n" +
    "                            Email\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldNurse == 'Email'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortNurse ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center\" style=\"width:69px;\">\n" +
    "                        Remove\n" +
    "                    </th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"nurse in nurses | orderBy:orderByFieldNurse:reverseSortNurse\">\n" +
    "                    <td>{{nurse.LastName}}, {{nurse.FirstName}}</td>\n" +
    "                    <td>{{nurse.UserName}}</td>\n" +
    "                    <td>{{nurse.Email}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"remove-nurse\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"removeUser(nurse)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"row text-center\">\n" +
    "            <button id=\"prev-nurse-pg\" class=\"btn btn-lg\" ng-click=\"getNurses(nursesPage - 1)\" ng-hide=\"!hasPrev\" ng-disabled=\"isLoading\">\n" +
    "                <<\n" +
    "            </button>\n" +
    "            <button id=\"next-nurse-pg\" class=\"btn btn-lg\" ng-click=\"getNurses(nursesPage + 1)\" ng-hide=\"!hasNext\" ng-disabled=\"isLoading\">\n" +
    "                >>\n" +
    "            </button>\n" +
    "            <div>{{nursesPage}} of {{numPages}}</div>\n" +
    "        </div>\n" +
    "    </tab>\n" +
    "    <tab heading=\"Supporters\" id=\"supporter-tab\" ng-click=\"getSupporters(supportersPage)\">\n" +
    "        <table id=\"supporter-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldSupporter = ['LastName', 'FirstName']; reverseSortSupporter = !reverseSortSupporter\">\n" +
    "                            Full Name\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldSupporter == 'LastName'\" class=\"fa\"\n" +
    "                              ng-class=\"reverseSortSupporter ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldSupporter ='UserName'; reverseSortSupporter = !reverseSortSupporter\">\n" +
    "                            UserName\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldSupporter == 'UserName'\" class=\"fa\"\n" +
    "                              ng-class=\"reverseSortSupporter ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th class=\"col-md-3\">\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldSupporter ='Email'; reverseSortSupporter = !reverseSortSupporter\">\n" +
    "                            Email\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldSupporter == 'Email'\" class=\"fa\"\n" +
    "                              ng-class=\"reverseSortSupporter ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "\n" +
    "                    <th class=\"col-md-3\">CareTeam</th>\n" +
    "                    <th style=\"width:69px;\">Remove</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"supporter in supporters | orderBy:orderByFieldSupporter:reverseSortSupporter | filter:{Roles:'Supporter'}\">\n" +
    "                    <td>{{supporter.LastName}}, {{supporter.FirstName}}</td>\n" +
    "                    <td>{{supporter.UserName}}</td>\n" +
    "                    <td>{{supporter.Email}}</td>\n" +
    "                    <td>\n" +
    "                        <ul>\n" +
    "                            <li ng-repeat=\"careTeamName in supporter.SupporterCareTeamNames\">{{careTeamName}}</li>\n" +
    "                        </ul>\n" +
    "                    </td>\n" +
    "                    <td align=\"center\">\n" +
    "                        <button id=\"remove-supporter\" class=\"btn btn-danger btn-xs\" ng-click=\"removeUser(supporter)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"row text-center\">\n" +
    "            <button id=\"prev-supp-pg\" class=\"btn btn-lg\" ng-click=\"getSupporters(supportersPage - 1)\" ng-hide=\"!hasPrev\" ng-disabled=\"isLoading\">\n" +
    "                <<\n" +
    "            </button>\n" +
    "            <button id=\"next-supp-pg\" class=\"btn btn-lg\" ng-click=\"getSupporters(supportersPage + 1)\" ng-hide=\"!hasNext\" ng-disabled=\"isLoading\">\n" +
    "                >>\n" +
    "            </button>\n" +
    "            <div>{{supportersPage}} of {{numPages}}</div>\n" +
    "        </div>\n" +
    "    </tab>\n" +
    "    <tab heading=\"CareTeams\" id=\"careteam-tab\" ng-click=\"ProviderTabActive=false;SupporterTabActive=false\">\n" +
    "        <table id=\"careteams-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldCareTeam='Name'; reverseSortCareTeam = !reverseSortCareTeam\">\n" +
    "                            Care Team Name\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldCareTeam == 'Name'\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByFieldCareTeam=['Patient.LastName', 'Patient.FirstName']; reverseSortCareTeam = !reverseSortCareTeam\">\n" +
    "                            Patient\n" +
    "                        </a>\n" +
    "                        <span ng-show=\"orderByFieldCareTeam == ['Patient.LastName', 'Patient.FirstName']\"\n" +
    "                              class=\"fa\"\n" +
    "                              ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>Providers</th>\n" +
    "                    <th>Supporters</th>\n" +
    "                    <th style=\"width:69px;\">Remove</th>\n" +
    "                    <th style=\"width:69px;\">Update</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"careTeam in careTeams | orderBy:orderByFieldCareTeam:reverseSortCareTeam\">\n" +
    "                    <td>{{careTeam.Name}}</td>\n" +
    "                    <td>{{careTeam.Patient.LastName}}, {{careTeam.Patient.FirstName}}</td>\n" +
    "                    <td>\n" +
    "                        <ul>\n" +
    "                            <li ng-repeat=\"provider in careTeam.Providers\">{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                        </ul>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <ul>\n" +
    "                            <li ng-repeat=\"supporter in careTeam.Supporters\">{{supporter.LastName}}, {{supporter.FirstName}}</li>\n" +
    "                        </ul>\n" +
    "                    </td>\n" +
    "                    <td align=\"center\">\n" +
    "                        <button id=\"remove-careteam\" class=\"btn btn-danger btn-xs\" ng-click=\"removeCareTeam(careTeam)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                    <td align=\"center\">\n" +
    "                        <button id=\"update-careteam\" class=\"btn btn-primary btn-xs\" ng-click=\"updateCareTeam(careTeam)\">\n" +
    "                            <i class=\"glyphicon glyphicon-wrench\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div ng-hide=\"inactiveTeamsEmpty\">\n" +
    "            <label>Pending Patient Approval</label>\n" +
    "            <table id=\"inactive-careteams-list\" class=\"table table-striped table-hover\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldCareTeam='Name'; reverseSortCareTeam = !reverseSortCareTeam\">\n" +
    "                                Name <span class=\"fa\"\n" +
    "                                           ng-show=\"orderByFieldCareTeam == 'Name'\"\n" +
    "                                           ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                            </a>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldCareTeam=['Patient.LastName', 'Patient.FirstName']; reverseSortCareTeam = !reverseSortCareTeam\">\n" +
    "                                Patient <span class=\"fa\"\n" +
    "                                              ng-show=\"orderByFieldCareTeam == ['Patient.LastName', 'Patient.FirstName']\"\n" +
    "                                              ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                            </a>\n" +
    "                        </th>\n" +
    "                        <th>Providers</th>\n" +
    "                        <th>Supporters</th>\n" +
    "                        <th style=\"width:69px;\">Remove</th>\n" +
    "                        <th style=\"width:69px;\">Update</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"careTeam in inactiveTeams | orderBy:orderByFieldCareTeam:reverseSortCareTeam\">\n" +
    "                        <td>{{careTeam.Name}}</td>\n" +
    "                        <td>{{careTeam.Patient.LastName}}, {{careTeam.Patient.FirstName}}</td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"provider in careTeam.Providers\">{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"supporter in careTeam.Supporters\">{{supporter.LastName}}, {{supporter.FirstName}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td align=\"center\">\n" +
    "                            <button id=\"remove-inactive-careteam\" class=\"btn btn-danger btn-xs\" ng-click=\"removeCareTeam(careTeam)\">\n" +
    "                                <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                        <td align=\"center\">\n" +
    "                            <button id=\"update-inactive-careteam\" class=\"btn btn-primary btn-xs\" ng-click=\"updateCareTeam(careTeam)\">\n" +
    "                                <i class=\"glyphicon glyphicon-wrench\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </tab>\n" +
    "</tabset>\n" +
    "");
}]);

angular.module("app.confirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app.confirm.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Are You Sure?</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <p style=\"margin-bottom:0px\">{{confirmText || \"Are you sure you want to do this?\"}}</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default btn-large\" ng-click=\"$dismiss()\">{{cancelButton || \"Cancel\"}}</button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"$close()\">{{confirmButton || \"Confirm\"}}</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("app.error.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app.error.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{errorType || \"Error Received!\"}}</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <p style=\"margin-bottom:0px\">{{confirmText || \"An error occurred in communicating with the server.\"}}</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-danger btn-large\" ng-click=\"$dismiss()\">{{cancelButton || \"Cancel\"}}</button>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"$close()\">{{confirmButton || \"Resolve\"}}</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("careteams/careteams.add.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("careteams/careteams.add.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Create New Care Team</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    {{error}}\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n" +
    "                <input id=\"patient-name\" class=\"form-control\" placeholder=\"Patient Name\" type=\"text\" \n" +
    "                       ng-model=\"patientName\" \n" +
    "                       disabled required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"careteam-name\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-tag\"></i></span>\n" +
    "                <input id=\"team-name\" class=\"form-control\" placeholder=\"Team Name\" type=\"text\" \n" +
    "                       ng-model=\"creator.Name\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-search\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-user-md\"></i></span>\n" +
    "                <input id=\"provider-email-filter\" class=\"form-control\" placeholder=\"Add providers by email\" type=\"text\"\n" +
    "                       ng-keypress=\"enterProviders($event)\" \n" +
    "                       ng-model=\"providerEmail\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button id=\"search-providers\" class=\"btn\" type=\"button\" ng-click=\"searchProviders()\"><i class=\"fa fa-search\"></i></button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <label>Selected Providers</label>\n" +
    "        <table id=\"selected-providers\" class=\"table table-striped table-hover\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"provider in selectedProviders\">\n" +
    "                    <td>{{provider.FirstName}} {{provider.LastName}}</td>\n" +
    "                    <td>{{provider.Email}}</td>\n" +
    "                    <td>{{provider.Roles[0]}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"deselect-provider\" class=\"btn btn-danger btn-sm\" type=\"button\"\n" +
    "                                ng-click=\"removeProvider(provider)\">\n" +
    "                            <i class=\"fa fa-trash-o\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div id=\"supporter-search\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-users\"></i></span>\n" +
    "                <input id=\"supporter-email-filter\" class=\"form-control\" placeholder=\"Add supporters by email\" type=\"text\"\n" +
    "                        ng-keypress=\"enterSupporters($event)\"\n" +
    "                        ng-model=\"supporterEmail\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button id=\"search-supporters\" class=\"btn\" type=\"button\" ng-click=\"searchSupporters()\"><i class=\"fa fa-search\"></i></button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <label>Selected Supporters</label>\n" +
    "        <table id=\"selected-supporters\" class=\"table table-striped table-hover\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"supporter in selectedSupporters\">\n" +
    "                    <td>{{supporter.FirstName}} {{supporter.LastName}}</td>\n" +
    "                    <td>{{supporter.Email}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"deselect-supporter\" class=\"btn btn-danger btn-sm\" type=\"button\"\n" +
    "                                ng-click=\"removeSupporter(supporter)\">\n" +
    "                            <i class=\"fa fa-trash-o\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" style=\"pointer-events:none\">\n" +
    "        <div class=\"profile-buttons\">\n" +
    "            <button id=\"create-btn\" class=\"btn btn-primary btn-lg\" type=\"button\" \n" +
    "                    ng-click=\"create()\" \n" +
    "                    ng-disabled=\"form.$invalid || data.isSubmitting\" \n" +
    "                    style=\"pointer-events:all\" \n" +
    "                    autofocus>\n" +
    "                Create Care Team\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("careteams/careteams.update.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("careteams/careteams.update.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Update CareTeam</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <label>Team Name</label>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-tag\"></i></span>\n" +
    "                <input id=\"team-name\" class=\"form-control\" placeholder=\"Name\" type=\"text\" ng-model=\"careTeam.Name\" required>\n" +
    "            </div>                   \n" +
    "        </div>\n" +
    "        <label>Providers</label>\n" +
    "        <ng-form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><i class=\"fa fa-user-md\"></i></span>\n" +
    "                    <input id=\"provider-name-filter\" class=\"form-control\" placeholder=\"Search providers by name\" type=\"text\"\n" +
    "                           ng-keypress=\"enterProviders($event)\"\n" +
    "                           ng-model=\"providerEmail\">\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                        <button id=\"search-providers\" class=\"btn\" type=\"button\" ng-click=\"searchProviders()\"><i class=\"fa fa-search\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "        <label>Selected</label>\n" +
    "        <table id=\"selected-providers\" class=\"table table-striped table-hover\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"provider in selectedProviders\">\n" +
    "                    <td>{{provider.FirstName}} {{provider.LastName}}</td>\n" +
    "                    <td>{{provider.Email}}</td>\n" +
    "                    <td>{{provider.Roles[0]}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"deselect-provider\" class=\"btn btn-danger btn-sm\" type=\"button\"\n" +
    "                                ng-click=\"removeProvider(provider)\">\n" +
    "                            <i class=\"fa fa-trash-o\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <label>Supporters</label>\n" +
    "        <ng-form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><i class=\"fa fa-users\"></i></span>\n" +
    "                    <input id=\"supporter-name-filter\" class=\"form-control\" placeholder=\"Search supporters by name\" type=\"text\"\n" +
    "                           ng-keypress=\"enterSupporters($event)\"\n" +
    "                           ng-model=\"supporterEmail\">\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                        <button id=\"search-supporters\" class=\"btn\" type=\"button\" ng-click=\"searchSupporters()\"><i class=\"fa fa-search\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "        <label>Selected</label>\n" +
    "        <table id=\"selected-supporters\" class=\"table table-striped table-hover\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"supporter in selectedSupporters\">\n" +
    "                    <td>{{supporter.FirstName}} {{supporter.LastName}}</td>\n" +
    "                    <td>{{supporter.Email}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"deselect-supporter\" class=\"btn btn-danger btn-sm\" type=\"button\"\n" +
    "                                ng-click=\"removeSupporter(supporter)\">\n" +
    "                            <i class=\"fa fa-trash-o\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" style=\"pointer-events:none\">\n" +
    "        <div class=\"profile-buttons\">\n" +
    "            <button class=\"btn btn-primary btn-lg\" type=\"button\" \n" +
    "                    ng-click=\"update()\" \n" +
    "                    ng-disabled=\"form.$invalid || data.isSubmitting\" \n" +
    "                    style=\"pointer-events:all\">\n" +
    "                Update CareTeam\n" +
    "            </button>           \n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("login/login.forgot.password.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.forgot.password.tpl.html",
    "<form name=\"form\" ng-submit=\"forgotPassword()\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Forgot Password</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"username\">Username</label>\n" +
    "                    <input id=\"username\" class=\"form-control\" placeholder=\"Enter your username\" type=\"text\" ng-model=\"data.username\" required autofocus>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"data.isSubmitting\">Reset My Password</button>\n" +
    "        <button class=\"btn btn-warning\" type=button ng-click=\"$dismiss()\" ng-disabled=\"data.isSubmitting\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("login/login.forgot.username.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.forgot.username.tpl.html",
    "<form ng-submit=\"forgotUsername()\" name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Forgot Username</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"email\">Email</label>\n" +
    "                    <input id=\"email\" class=\"form-control\" placeholder=\"Enter your email\" type=\"email\" ng-model=\"data.email\" required autofocus>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\"  ng-disabled=\"data.isSubmitting\">Send My Username</button>\n" +
    "        <button class=\"btn btn-warning\" type=button ng-click=\"$dismiss()\" ng-disabled=\"data.isSubmitting\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("login/login.resendVerify.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.resendVerify.tpl.html",
    "<form>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Resend Email Verification</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"email\">Email</label>\n" +
    "                    <input id=\"email\" class=\"form-control\" placeholder=\"Enter your email\" type=\"email\" ng-model=\"data.email\" required autofocus>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-click=\"resendVerify()\" ng-disabled=\"form.$invalid || data.isSubmitting\">Send</button>\n" +
    "        <button class=\"btn btn-warning\" type=button ng-click=\"$dismiss()\" ng-disabled=\"data.isSubmitting\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("login/login.resetPassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.resetPassword.tpl.html",
    "<form>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Reset Password</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"newPassword\">New Password</label>\n" +
    "                    <input id=\"newPassword\" class=\"form-control\" placeholder=\"Enter your new password\" type=\"password\" ng-model=\"data.newPassword\" required autofocus>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"confirmPassword\">Confirm Password</label>\n" +
    "                    <input id=\"confirmPassword\" class=\"form-control\" placeholder=\"Confirm your new password\" type=\"password\" ng-model=\"data.confirmPassword\" required autofocus>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-click=\"resetPassword()\" ng-disabled=\"form.$invalid || data.isSubmitting\">Reset My Password</button>\n" +
    "        <button class=\"btn btn-warning\" type=button ng-click=\"$dismiss()\" ng-disabled=\"data.isSubmitting\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"text-center\">      \n" +
    "        <p><h1 class=\"text-center\"> CloudMedic <span class=\"glyphicon glyphicon-plus text-danger\" aria-hidden=\"true\"></span></h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6 col-md-offset-3\">\n" +
    "        <div class=\"well\" style=\"padding-top:0px\">\n" +
    "            <h2 class=\"text-center\">Login</h2>\n" +
    "            <cm-notification-bar></cm-notification-bar>\n" +
    "            <form name=\"form\" novalidate role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <input id=\"login-username\" class=\"form-control\" placeholder=\"Username\" type=\"text\" ng-model=\"loginData.username\" required autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                        <input id=\"user-password\" class=\"form-control\" placeholder=\"Password\" type=\"password\" ng-model=\"loginData.password\" required >\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" \n" +
    "                            ng-click=\"login()\" \n" +
    "                            ng-disabled='form.$invalid || loginData.isSubmitting' >Login to your account</button>                    \n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <div class=\"text-center\">\n" +
    "                <strong>Don't have an account? \n" +
    "                    <a ui-sref=\"register\" title=\"Sign Up for a Free CloudMedic Account\" \n" +
    "                       ng-class=\"{'disabled': loginData.isSubmitting}\" >\n" +
    "                        Patient registration\n" +
    "                    </a>\n" +
    "                </strong>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("medications/medications.add.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("medications/medications.add.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Add New Medication</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"glyphicon glyphicon-tag\"></i></span>\n" +
    "                <input id=\"medication-genericname\" class=\"form-control\" placeholder=\"Generic Name\" type=\"text\" \n" +
    "                       ng-model=\"medicationsData.GenericName\" \n" +
    "                       watch-change=\"check_generic_name()\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"generic-name-error\" class=\"form-group\" ng-hide=\"GenericName_Valid\">\n" +
    "            <font color=\"red\">Generic Name must only contain letters.</font>\n" +
    "        </div>  \n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><font size=\"4\">#</font></span>\n" +
    "                <input id=\"medication-code\" class=\"form-control\" placeholder=\"Code\" type=\"text\"  maxlength=\"5\" \n" +
    "                       ng-pattern=\"/^\\d{5}$/\" \n" +
    "                       ng-model=\"medicationsData.Code\" \n" +
    "                       ng-maxlength=\"5\"\n" +
    "                       watch-change=\"check_code()\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"code-error\" class=\"form-group\" ng-hide=\"Code_Valid\">\n" +
    "            <font color=\"red\">Code must only contain numbers.</font>\n" +
    "        </div>        \n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" ng-click=\"create()\" ng-disabled=\"form.$invalid || medicationsData.isSubmitting\">\n" +
    "                    Create\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("medications/medications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("medications/medications.tpl.html",
    "<div>\n" +
    "    <h2>Medications<button class=\"btn btn-lg btn-default pull-right\" ng-click=\"createMedication()\">Add Medication</button></h2>\n" +
    "    <table id=\"medications-list\" class=\"table table-striped table-hover\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='GenericName'; reverseSort = !reverseSort\">\n" +
    "                        Generic Name\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'GenericName'\"></span>\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='MedicationId'; reverseSort = !reverseSort\">\n" +
    "                        Medication ID\n" +
    "                    </a>        \n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'MedicationId'\"></span>        \n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='Code'; reverseSort = !reverseSort\">\n" +
    "                        Code\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'Code'\"></span>\n" +
    "                </th>\n" +
    "                <th style=\"width:69px;\">Remove</th>\n" +
    "                <th style=\"width:69px;\">Prescribe</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"medication in medications | orderBy:orderByField:reverseSort\">\n" +
    "                <td>{{medication.GenericName}}</td>\n" +
    "                <td>{{medication.MedicationId | uppercase}}</td>\n" +
    "                <td>{{medication.Code}}</td>\n" +
    "                <td>\n" +
    "                    <button id=\"remove-medication\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"removeMedication(medication)\">\n" +
    "                        <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                    </button>\n" +
    "                </td>\n" +
    "                <td align=\"center\">\n" +
    "                    <button id=\"prescribe-medication\" class=\"btn btn-primary btn-xs\" ng-click=\"createPrescription(medication)\">\n" +
    "                        <i class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                    </button>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("navbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navbar.tpl.html",
    "<div class=\"top-section-small\">\n" +
    "    <div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n" +
    "        <div class=\"container\">            \n" +
    "            <div class=\"navbar-header\">\n" +
    "                <button type=\"button\" class=\"navbar-toggle\" ng-init=\"menuCollapsed = true\"\n" +
    "                        ng-click=\"menuCollapsed = ! menuCollapsed\">\n" +
    "                    <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                </button>\n" +
    "                <div class=\"navbar-brand\">\n" +
    "                    <p>CloudMedic <span ng-repeat=\"userRole in authStatus.userRoles\">{{userRole}}</span> <span class=\"glyphicon glyphicon-plus text-danger\" aria-hidden=\"true\"></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"collapse navbar-collapse navbar-inner navbar-right\" collapse=\"menuCollapsed\" id=\"top-nav\">\n" +
    "                <ul class=\"nav navbar-nav top-menu\" ng-click=\"menuCollapsed = true\">\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isAdmin()\" ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"admin\">\n" +
    "                            <i class=\"fa fa-lock\"></i>\n" +
    "                            Admin\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isSupporter()\" ng-class=\"{active: $state.includes('supporter')}\">\n" +
    "                        <a href ui-sref=\"supporter\">\n" +
    "                            <i class=\"fa fa-bug\"></i>\n" +
    "                            Supporter\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isPatient()\" ng-class=\"{active: $state.includes('patient')}\">\n" +
    "                        <a href ui-sref=\"patient\">\n" +
    "                            <i class=\"fa fa-user\"></i>\n" +
    "                            User\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isStaff()\" ui-sref-active=\"active\">\n" +
    "                        <a href ui-sref=\"provider\">\n" +
    "                            <i class=\"fa fa-user-md\"></i>\n" +
    "                            Provider\n" +
    "                        </a>\n" +
    "                    </li>                            \n" +
    "                    <li ng-hide=\"authStatus.isLoggedIn\" ui-sref-active=\"active\" >\n" +
    "                        <a ui-sref=\"login\">Login</a>\n" +
    "                    </li>                    \n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isMedicationViewer()\" ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"medications\">\n" +
    "                            <i class=\"fa fa-medkit\"></i>\n" +
    "                            Medications\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn && isStaff()\" ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"prescriptions\">\n" +
    "                            <i class=\"fa fa-plus-square\"></i>\n" +
    "                            Prescriptions\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn\" ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"profile\">\n" +
    "                            <i class=\"glyphicon glyphicon-wrench\"></i>\n" +
    "                            Profile\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"authStatus.isLoggedIn\">\n" +
    "                        <a ng-click=\"logout()\">\n" +
    "                            <i class=\"fa fa-sign-out\"></i>\n" +
    "                            Logout\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <cm-notification-bar></cm-notification-bar>        \n" +
    "</div>\n" +
    "");
}]);

angular.module("patient/patient.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("patient/patient.tpl.html",
    "<div class=\"col-md-10 col-md-offset-1\">\n" +
    "    <tabset id=\"tabs\">\n" +
    "        <tab heading=\"Team Invites\" id=\"invites-tab\" active=\"ActiveTab[0]\">\n" +
    "            <table id=\"pending-team-list\" class=\"table table-striped table-hover\" ng-show=\"hasPending\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldPending='Name'; reverseSortPending = !reverseSortPending\">\n" +
    "                                Care Team Name\n" +
    "                            </a>\n" +
    "                            <span ng-show=\"orderByFieldPending == 'Name'\"\n" +
    "                                  class=\"fa\"\n" +
    "                                  ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                        </th>\n" +
    "                        <th>Providers</th>\n" +
    "                        <th>Supporters</th>\n" +
    "                        <th style=\"width:69px;\">Approve</th>\n" +
    "                        <th style=\"width:69px;\">Reject</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"careTeam in careTeams | orderBy:orderByFieldPending:reverseSortPending | filter:isPending\">\n" +
    "                        <td>{{careTeam.Name}}</td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"provider in careTeam.Providers\">{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"supporter in careTeam.Supporters\">{{supporter.LastName}}, {{supporter.FirstName}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td align=\"center\">\n" +
    "                            <button id=\"approve-team\" class=\"btn btn-primary btn-xs\" ng-click=\"approveCareTeam(careTeam)\">\n" +
    "                                <i class=\"glyphicon glyphicon-check\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                        <td align=\"center\">\n" +
    "                            <button id=\"reject-team\" class=\"btn btn-danger btn-xs\" ng-click=\"rejectCareTeam(careTeam)\">\n" +
    "                                <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Prescriptions\" id=\"prescription-tab\" active=\"ActiveTab[1]\">\n" +
    "            <table id=\"prescription-list\" class=\"table table-striped table-hover\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldPrescription='MedicationName'; reverseSortPrescription = !reverseSortPrescription\">\n" +
    "                                Medication\n" +
    "                            </a>\n" +
    "                            <span class=\"fa\"\n" +
    "                                  ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                                  ng-show=\"orderByFieldPrescription == 'MedicationName'\"></span>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldPrescription='StartDate'; reverseSortPrescription = !reverseSortPrescription\">\n" +
    "                                Start Date\n" +
    "                            </a>\n" +
    "                            <span class=\"fa\"\n" +
    "                                  ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                                  ng-show=\"orderByFieldPrescription == 'StartDate'\"></span>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldPrescription='EndDate'; reverseSortPrescription = !reverseSortPrescription\">\n" +
    "                                End Date\n" +
    "                            </a>\n" +
    "                            <span class=\"fa\"\n" +
    "                                  ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                                  ng-show=\"orderByFieldPrescription == 'EndDate'\"></span>\n" +
    "                        </th>\n" +
    "                        <th>Frequency</th>\n" +
    "                        <th>Dosage</th>\n" +
    "                        <th>Notes</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"prescription in prescriptions | orderBy:orderByFieldPrescription:reverseSortPrescription\">\n" +
    "                        <td>{{prescription.MedicationName}}</td>\n" +
    "                        <td>{{prescription.StartDate | date}}</td>\n" +
    "                        <td>{{prescription.EndDate | date}}</td>\n" +
    "                        <td>{{prescription.Frequency}}</td>\n" +
    "                        <td>{{prescription.Dosage}}</td>\n" +
    "                        <td class=\"col-md-4\">{{prescription.Notes}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </tab>\n" +
    "        <tab heading=\"CareTeams\" id=\"careteam-tab\" active=\"ActiveTab[2]\">\n" +
    "            <table id=\"careteams-list\" class=\"table table-striped table-hover\">\n" +
    "                <thead>\n" +
    "                    <tr >\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"orderByFieldCareTeam='Name'; reverseSortCareTeam = !reverseSortCareTeam\">\n" +
    "                                Name\n" +
    "                            </a>\n" +
    "                            <span ng-show=\"orderByFieldCareTeam == 'Name'\"\n" +
    "                                  class=\"fa\"\n" +
    "                                  ng-class=\"reverseSortCareTeam ? 'fa-caret-up' : 'fa-caret-down'\"></span>\n" +
    "                        </th>\n" +
    "                        <th>Providers</th>\n" +
    "                        <th>Supporters</th>\n" +
    "                        <th style=\"width:69px;\">Remove</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"careTeam in careTeams | orderBy:orderByFieldCareTeam:reverseSortCareTeam | filter:isActive\">\n" +
    "                        <td>{{careTeam.Name}}</td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"provider in careTeam.Providers\">{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"supporter in careTeam.Supporters\">{{supporter.LastName}}, {{supporter.FirstName}}</li>\n" +
    "                            </ul>\n" +
    "                        </td>\n" +
    "                        <td align=\"center\">\n" +
    "                            <button id=\"remove-careteam\" class=\"btn btn-danger btn-xs\" ng-click=\"rejectCareTeam(careTeam)\">\n" +
    "                                <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>\n" +
    "");
}]);

angular.module("prescriptions/prescriptions.add.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("prescriptions/prescriptions.add.tpl.html",
    "<form name=\"form\" ng-submit=\"create()\" ng-init=\"sort()\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Add New Prescription</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-medkit\"></i></span>\n" +
    "                <input id=\"medication-name\" class=\"form-control\" placeholder=\"Medication Name\" type=\"text\" \n" +
    "                       ng-model=\"Creator.MedicationName\" \n" +
    "                       disabled required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-clock-o\"></i></span>\n" +
    "                <input id=\"prescription-frequency\" class=\"form-control\" placeholder=\"Frequency\" type=\"text\" \n" +
    "                       ng-model=\"Creator.Frequency\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-plus\"></i></span>\n" +
    "                <input id=\"prescription-dosage\" class=\"form-control\" placeholder=\"Dosage\" type=\"text\" \n" +
    "                       ng-model=\"Creator.Dosage\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-pencil\"></i></span>\n" +
    "                <textarea id=\"prescription-notes\" class=\"form-control\" placeholder=\"Notes\" type=\"text\" \n" +
    "                          ng-model=\"Creator.Notes\" \n" +
    "                          required></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"form-inline\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                        <div class=\"form-inline\">\n" +
    "                            <input type=\"text\" id=\"prescription-add-date\" class=\"form-control\" \n" +
    "                                   ng-model=\"dt\" \n" +
    "                                   ng-click=\"open($event)\" \n" +
    "                                   datepicker-popup=\"{{format}}\" \n" +
    "                                   placeholder=\"YYYY-MM-DD\" \n" +
    "                                   show-button-bar=\"false\" \n" +
    "                                   is-open=\"opened\" \n" +
    "                                   datepicker-options=\"dateOptions\" \n" +
    "                                   ng-required=\"true\" \n" +
    "                                   close-text=\"Close\" />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-clock-o\"></i></span>\n" +
    "                        <select id=\"duration-dropdown\" required class=\"form-control\" ng-model=\"data.Duration\" ng-options=\"period as period for period in Periods\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">Duration</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <select id=\"duration-dropdown\" required class=\"form-control\" ng-model=\"data.Units\">\n" +
    "                            <option value=\"1\">Days</option>\n" +
    "                            <option value=\"7\">Weeks</option>\n" +
    "                            <option value=\"31\">Months</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-cloud\"></i></span>\n" +
    "                <input id=\"patient-name-filter\" class=\"form-control\" placeholder=\"Filter Patient (Last Name, First Name)\" type=\"text\" \n" +
    "                       ng-model=\"data.PatientName\" \n" +
    "                       ng-change=\"filter()\">\n" +
    "                <button type=\"submit\" ng-click=\"filter()\" ng-hide=\"true\"></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <tabset>\n" +
    "            <tab heading=\"A-I\" id=\"a-i-tab\" active=\"AITab\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <select id=\"ai-list\" multiple required class=\"form-control\" ng-model=\"data.PatientId\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">--Select Patient--</option>\n" +
    "                            <option ng-repeat=\"candidate in CandidatesAI\" value=\"{{candidate.UserId}}\">\n" +
    "                                Name: {{candidate.LastName}}, {{candidate.FirstName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Born: {{candidate.DateOfBirth | date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UserName: {{candidate.UserName}}\n" +
    "                            </option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "            <tab heading=\"J-Q\" id=\"j-q-tab\" active=\"JQTab\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <select id=\"jq-list\" multiple required class=\"form-control\" ng-model=\"data.PatientId\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">--Select Patient--</option>\n" +
    "                            <option ng-repeat=\"candidate in CandidatesJQ\" value=\"{{candidate.UserId}}\">\n" +
    "                                Name: {{candidate.LastName}}, {{candidate.FirstName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Born: {{candidate.DateOfBirth | date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UserName: {{candidate.UserName}}\n" +
    "                            </option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "            <tab heading=\"R-Z\" id=\"r-z-tab\" active=\"RZTab\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <select id=\"rz-list\" multiple required class=\"form-control\" ng-model=\"data.PatientId\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">--Select Patient--</option>\n" +
    "                            <option ng-repeat=\"candidate in CandidatesRZ\" value=\"{{candidate.UserId}}\">\n" +
    "                                Name: {{candidate.LastName}}, {{candidate.FirstName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Born: {{candidate.DateOfBirth | date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UserName: {{candidate.UserName}}\n" +
    "                            </option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "        </tabset>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button class=\"btn btn-danger btn-lg btn-block\" type=\"button\" ng-click=\"create()\" ng-disabled=\"form.$invalid || data.isSubmitting\">Create</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("prescriptions/prescriptions.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("prescriptions/prescriptions.tpl.html",
    "<h2>Prescriptions</h2>\n" +
    "<tabset>\n" +
    "    <tab heading=\"Active\" id=\"active-tab\">\n" +
    "        <table id=\"active-prescription-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='MedicationCode'; reverseSort = !reverseSort\">\n" +
    "                            Medication\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'MedicationCode'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='PatientName'; reverseSort = !reverseSort\">\n" +
    "                            Patient\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'PatientName'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='StartDate'; reverseSort = !reverseSort\">\n" +
    "                            Start Date\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'StartDate'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='EndDate'; reverseSort = !reverseSort\">\n" +
    "                            End Date\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'EndDate'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>Frequency</th>\n" +
    "                    <th>Dosage</th>\n" +
    "                    <th>Notes</th>\n" +
    "                    <th style=\"width:69px;\" class=\"text-center\">Edit</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"prescription in activePrescriptions | orderBy:orderByField:reverseSort\">\n" +
    "                    <td>{{prescription.MedicationCode}} ({{prescription.MedicationName}})</td>\n" +
    "                    <td>{{prescription.PatientName}}</td>\n" +
    "                    <td>{{prescription.StartDate | date}}</td>\n" +
    "                    <td>{{prescription.EndDate | date}}</td>\n" +
    "                    <td>{{prescription.Frequency}}</td>\n" +
    "                    <td>{{prescription.Dosage}}</td>\n" +
    "                    <td class=\"col-md-3\">\n" +
    "                        <button popover=\"{{prescription.Notes}}\" popover-placement=\"bottom\" popover-trigger=\"mouseenter\" class=\"btn btn-default\">{{prescription.Notes | cutTo:true:40}}</button>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <button id=\"update-prescription\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"updatePrescription(prescription)\">\n" +
    "                            <i class=\"glyphicon glyphicon-wrench\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "     </tab>\n" +
    "    <tab heading=\"Expired\" id=\"expired-tab\">\n" +
    "        <table id=\"expired-prescription-list\" class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='MedicationCode'; reverseSort = !reverseSort\">\n" +
    "                            Medication\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'MedicationCode'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='PatientName'; reverseSort = !reverseSort\">\n" +
    "                            Patient\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'PatientName'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='StartDate'; reverseSort = !reverseSort\">\n" +
    "                            Start Date\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'StartDate'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        <a href=\"#\" ng-click=\"orderByField='EndDate'; reverseSort = !reverseSort\">\n" +
    "                            End Date\n" +
    "                        </a>\n" +
    "                        <span class=\"fa\"\n" +
    "                              ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                              ng-show=\"orderByField == 'EndDate'\"></span>\n" +
    "                    </th>\n" +
    "                    <th>Frequency</th>\n" +
    "                    <th>Dosage</th>\n" +
    "                    <th>Notes</th>\n" +
    "                    <th style=\"width:69px;\" class=\"text-center\">Remove</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"prescription in expiredPrescriptions | orderBy:orderByField:reverseSort\">\n" +
    "                    <td>{{prescription.MedicationCode}} ({{prescription.MedicationName}})</td>\n" +
    "                    <td>{{prescription.PatientName}}</td>\n" +
    "                    <td>{{prescription.StartDate | date}}</td>\n" +
    "                    <td>{{prescription.EndDate | date}}</td>\n" +
    "                    <td>{{prescription.Frequency}}</td>\n" +
    "                    <td>{{prescription.Dosage}}</td>\n" +
    "                    <td class=\"col-md-3\">\n" +
    "                        <button popover=\"{{prescription.Notes}}\" popover-placement=\"bottom\" popover-trigger=\"mouseenter\" class=\"btn btn-default\">{{prescription.Notes | cutTo:true:40}}</button>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <button id=\"remove-prescription\" class=\"btn btn-danger btn-xs center-block\" ng-click=\"removePrescription(prescription)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </tab>\n" +
    "</tabset>");
}]);

angular.module("prescriptions/prescriptions.update.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("prescriptions/prescriptions.update.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Update Prescription</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <label>End Date</label>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"form-inline\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                                <div class=\"form-inline\">\n" +
    "                                    <input type=\"text\" id=\"prescription-date\" ng-model=\"dt\" ng-click=\"open($event)\" class=\"form-control\" datepicker-popup=\"{{format}}\" placeholder=\"YYYY-MM-DD\" show-button-bar=\"false\" is-open=\"opened\" datepicker-options=\"dateOptions\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <label>Notes</label>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-pencil\"></i></span>\n" +
    "                        <textarea id=\"prescription-notes\" class=\"form-control\" placeholder=\"Notes\" type=\"text\" ng-model=\"prescription.Notes\" required></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"profile-buttons\">\n" +
    "            <button class=\"btn btn-primary btn-lg\" ng-click=\"updatePrescription()\" type=\"submit\">Update Prescription</button>\n" +
    "            <a id=\"reset-prescription\" class=\"text-danger reset-link\" type=\"button\" ng-click=\"resetPrescription()\" ng-disabled=\"data.isSubmitting\">\n" +
    "                <i class=\"fa fa-undo\"></i> Reset\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("profile/profile.password.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/profile.password.tpl.html",
    "<form name=\"pwform\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Change Password</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"password-current-password\">Current Password</label>\n" +
    "                    <input id=\"password-current-password\" class=\"form-control\" placeholder=\"Enter your current password\" type=\"password\" \n" +
    "                           ng-model=\"password.OldPassword\" \n" +
    "                           required autofocus>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"password-new-password\">New Password</label>\n" +
    "                    <input id=\"user-password\" class=\"form-control\" pattern=\"(?=(.*\\d))(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*[^A-Za-z0-9])).{6,}\" placeholder=\"Enter your new password\" type=\"password\" \n" +
    "                           ng-model=\"password.NewPassword\" \n" +
    "                           watch-change=\"check_password()\" \n" +
    "                           required>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"password-confirm-password\">Confirm Password</label>\n" +
    "                    <input id=\"user-confirmpassword\" class=\"form-control\" placeholder=\"Confirm your new password\" type=\"password\" \n" +
    "                           ng-model=\"password.ConfirmPassword\" \n" +
    "                           watch-change=\"compare_passwords()\" \n" +
    "                           required>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div id=\"pw-invalid\" ng-hide=\"Password_Valid\">\n" +
    "                        <font color=\"red\">Password invalid:</font>\n" +
    "                        <ul style=\"margin-bottom:5px\">\n" +
    "                            <li id=\"pw-short\" ng-show=\"Password_Short\">\n" +
    "                                <font color=\"red\">must be at least six characters</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nodigit\" ng-hide=\"Password_Digit\">\n" +
    "                                <font color=\"red\">must contain a digit</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-noupper\" ng-hide=\"Password_Upper\">\n" +
    "                                <font color=\"red\">must contain an upper case character</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nolower\" ng-hide=\"Password_Lower\">\n" +
    "                                <font color=\"red\">must contain a lower case character</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nospecial\" ng-hide=\"Password_Special\">\n" +
    "                                <font color=\"red\">must contain a special character</font>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div id=\"pw-nomatch\" ng-hide=\"Passwords_Match\">\n" +
    "                        <font color=\"red\">Passwords must match!</font>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"changePassword()\" type=\"submit\" ng-disabled=\"data.isSubmitting || pwform.$invalid\">Change Password</button>\n" +
    "        <button class=\"btn btn-warning\" ng-click=\"$dismiss()\" type=\"button\" ng-disabled=\"data.isSubmitting\">Cancel</button>\n" +
    "    </div>    \n" +
    "</form>");
}]);

angular.module("profile/profile.update.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/profile.update.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6 col-md-offset-3\">\n" +
    "        <div class=\"well\">\n" +
    "            <form class=\"form-horizontal\" name=\"form\" ng-submit=\"updateProfile()\">\n" +
    "                <h2 class=\"form-header\">Edit Profile</h2>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <label for=\"profile-fn\" class=\"control-label pull-right\">Username:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <input id=\"user-username\" class=\"form-control\" pattern=\"[A-Za-z0-9.]{3,20}\" placeholder=\"Username\" type=\"text\" \n" +
    "                               ng-model=\"profile.Username\" \n" +
    "                               watch-change=\"check_username()\" \n" +
    "                               required tabindex=\"0\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"un-invalid-length\" class=\"form-group text-center\" \n" +
    "                     ng-hide=\"Username_Valid_length\">\n" +
    "                    <font color=\"red\">Username must contain 3-20 characters.</font>\n" +
    "                </div>\n" +
    "                <div id=\"un-invalid-symbol\" class=\"form-group text-center\" ng-hide=\"Username_Valid_symbol\">\n" +
    "                    <font color=\"red\">Username must only contain letters/numbers.</font>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <label for=\"profile-fn\" class=\"control-label pull-right\">FirstName:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <input id=\"user-first\" class=\"form-control\" pattern=\"[A-Za-z]{1,}\" placeholder=\"First Name\" type=\"text\" \n" +
    "                               ng-model=\"profile.FirstName\" \n" +
    "                               watch-change=\"check_firstName()\" \n" +
    "                               required tabindex=\"0\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"fn-invalid\" class=\"form-group text-center\" ng-hide=\"Firstname_Valid\">\n" +
    "                    <font color=\"red\">First name must only contain letters.</font>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                            <label for=\"profile-ln\" class=\"control-label pull-right\">LastName:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <input id=\"user-last\" class=\"form-control\" pattern=\"[A-Za-z]{1,}\" placeholder=\"Last Name\" type=\"text\" \n" +
    "                               ng-model=\"profile.LastName\" \n" +
    "                               watch-change=\"check_lastName()\" \n" +
    "                               required tabindex=\"0\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"ln-invalid\" class=\"form-group text-center\" ng-hide=\"Lastname_Valid\">\n" +
    "                    <font color=\"red\">Last name must only contain letters.</font>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <label for=\"profile-ln\" class=\"control-label pull-right\">Email:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <input id=\"register-email\" class=\"form-control\" type=\"text\" \n" +
    "                               ng-model=\"profile.Email\" \n" +
    "                               placeholder=\"Email\" \n" +
    "                               ng-disabled=\"data.isSubmitting\"\n" +
    "                               required autofocus />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-if=\"authStatus.ssoProvider == null\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <label for=\"profile-password\" class=\"control-label pull-right\">Password: </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <a ui-sref=\"profile.changePassword\" class=\"btn btn-default\" \n" +
    "                           ng-disabled=\"data.isSubmitting\">Change Password...</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"profile-buttons\">            \n" +
    "                    <button class=\"btn btn-primary btn-lg\" id=\"update-profile-btn\" type=\"submit\" ng-disabled=\"data.isSubmitting || form.$invalid\">Update Profile</button>\n" +
    "                    <a id=\"reset-update-form\" class=\"text-danger reset-link\" type=\"button\" ng-click=\"resetProfile()\" ng-disabled=\"data.isSubmitting\">\n" +
    "                        <i class=\"fa fa-undo\"></i> Reset\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    \n" +
    "");
}]);

angular.module("provider/history.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("provider/history.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h2 class=\"text-center\">Medications for: {{patient.LastName}}, {{patient.FirstName}}</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <table id=\"prescription-list\" class=\"table table-striped table-hover\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='MedicationName'; reverseSort = !reverseSort\">\n" +
    "                        Medication\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'MedicationName'\"></span>\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='StartDate'; reverseSort = !reverseSort\">\n" +
    "                        Start Date\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'StartDate'\"></span>\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='EndDate'; reverseSort = !reverseSort\">\n" +
    "                        End Date\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'EndDate'\"></span>\n" +
    "                </th>\n" +
    "                <th>Frequency</th>\n" +
    "                <th>Dosage</th>\n" +
    "                <th>Notes</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"prescription in prescriptions | orderBy:orderByField:reverseSort\">\n" +
    "                <td>{{prescription.MedicationName}}</td>\n" +
    "                <td>{{prescription.StartDate | date}}</td>\n" +
    "                <td>{{prescription.EndDate | date}}</td>\n" +
    "                <td>{{prescription.Frequency}}</td>\n" +
    "                <td>{{prescription.Dosage}}</td>\n" +
    "                <td>\n" +
    "                    <button popover=\"{{prescription.Notes}}\" popover-placement=\"bottom\" popover-trigger=\"mouseenter\" class=\"btn btn-default\">{{prescription.Notes | cutTo:true:10}}</button>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button id=\"close-hist-btn\" class=\"btn btn-default btn-large\" ng-click=\"$dismiss()\">Close</button>\n" +
    "</div>");
}]);

angular.module("provider/provider.add.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("provider/provider.add.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Register New Physician/Nurse</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div id=\"provider-email\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\" id=\"basic-addon1\">@</span>\n" +
    "                <input id=\"register-email\" class=\"form-control\" placeholder=\"Email\" type=\"email\" \n" +
    "                       ng-model=\"creator.Email\" \n" +
    "                       required autofocus>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-name\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"user-first\" class=\"form-control\" placeholder=\"First Name\" type=\"text\" \n" +
    "                       ng-model=\"creator.FirstName\" \n" +
    "                       ng-change=\"check_firstName()\" \n" +
    "                       required>\n" +
    "                <input id=\"user-last\" class=\"form-control\" placeholder=\"Last Name\" type=\"text\" \n" +
    "                       ng-model=\"creator.LastName\" \n" +
    "                       ng-change=\"check_lastName()\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-name-errors\"class=\"form-group\">\n" +
    "            <div id=\"fn-invalid\" ng-hide=\"Firstname_Valid\">\n" +
    "                <font color=\"red\">First name must only contain letters.</font>\n" +
    "            </div>\n" +
    "            <div id=\"ln-invalid\" ng-hide=\"Lastname_Valid\">\n" +
    "                <font color=\"red\">Last name must only contain letters.</font>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-phone\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-phone\"></i></span>\n" +
    "                <input id=\"register-phonenumber\" class=\"form-control\" placeholder=\"(xxx) xxx-xxxx\" type=\"text\" \n" +
    "                       ng-model=\"data.PhoneNumber\" \n" +
    "                       ui-mask=\"(999) 999-9999\" \n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-birthday-gender\" class=\"form-group\">\n" +
    "            <div class=\"form-inline\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-birthday-cake\"></i></span>\n" +
    "                        <div class=\"form-inline\">\n" +
    "                            <input type=\"text\" style=\"width:319px\" id=\"admin-DOB\" class=\"form-control\" \n" +
    "                                   ng-model=\"dt\" \n" +
    "                                   ng-click=\"open($event)\"\n" +
    "                                   datepicker-popup=\"{{format}}\" \n" +
    "                                   placeholder=\"YYYY-MM-DD\" \n" +
    "                                   show-button-bar=\"false\" \n" +
    "                                   is-open=\"opened\" \n" +
    "                                   datepicker-options=\"dateOptions\" \n" +
    "                                   ng-required=\"true\" \n" +
    "                                   close-text=\"Close\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-male\"></i> /  <i class=\"fa fa-female\"></i></span>\n" +
    "                        <select required class=\"form-control\" ng-model=\"creator.Gender\" aria-expanded=\"false\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">Gender</option>\n" +
    "                            <option value=\"male\">Male</option>\n" +
    "                            <option value=\"female\">Female</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"provider-role\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-heart\"></i></span>\n" +
    "                <select required class=\"col-md-12 form-control-static\" ng-model=\"data.Role\">\n" +
    "                    <option class=\"placeholder\" selected disabled value=\"\">Role</option>\n" +
    "                    <option value=\"Physician\">Physician</option>\n" +
    "                    <option value=\"Nurse\">Nurse</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button id=\"register-btn\" style=\"padding-top:5px\" class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" \n" +
    "                    ng-click=\"create()\" \n" +
    "                    ng-disabled=\"form.$invalid || data.isSubmitting\">\n" +
    "                Register\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("provider/provider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("provider/provider.tpl.html",
    "<div>\n" +
    "    <h2>Assigned Patients</h2>\n" +
    "    <table id=\"careteams-list\" class=\"table table-striped table-hover\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField=['Patient.LastName', 'Patient.FirstName']; reverseSort = !reverseSort\">\n" +
    "                        Patient\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == ['Patient.LastName', 'Patient.FirstName']\"></span>\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='Patient.DateOfBirth'; reverseSort = !reverseSort\">\n" +
    "                        Date of Birth\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'Patient.DateOfBirth'\"></span>\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='Patient.Gender'; reverseSort = !reverseSort\">\n" +
    "                        Gender\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'Patient.Gender'\"></span>\n" +
    "                </th>\n" +
    "                <th>Medication History</th>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='Name'; reverseSort = !reverseSort\">\n" +
    "                        CareTeam Name\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'Name'\"></span>\n" +
    "                </th>\n" +
    "                <th class=\"text-center\">Providers</th>\n" +
    "                <th class=\"text-center\">Supporters</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"careTeam in careTeams | orderBy:orderByField:reverseSort\">\n" +
    "                <td>{{careTeam.Patient.LastName}}, {{careTeam.Patient.FirstName}}</td>\n" +
    "                <td>{{careTeam.Patient.DateOfBirth | date}}</td>\n" +
    "                <td>{{careTeam.Patient.Gender}}</td>\n" +
    "                <td>\n" +
    "                    <button id=\"medication-info\" ng-click=\"medicationHistory(careTeam.Patient)\" class=\"btn btn-default\">\n" +
    "                        Click Me!\n" +
    "                    </button>\n" +
    "                </td>\n" +
    "                <td>{{careTeam.Name}}</td>\n" +
    "                <td>\n" +
    "                    <ul>\n" +
    "                        <li ng-repeat=\"provider in careTeam.Providers\">{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                    </ul>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <ul>\n" +
    "                        <li ng-repeat=\"supporter in careTeam.Supporters\">{{supporter.LastName}}, {{supporter.FirstName}}</li>\n" +
    "                    </ul>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("register/register.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/register.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"text-center\">\n" +
    "        <p><h1 class=\"text-center\">CloudMedic <span class=\"glyphicon glyphicon-plus text-danger\" aria-hidden=\"true\"></span></h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6 col-md-offset-3\">\n" +
    "        <div class=\"well\" style=\"padding-top:0\">\n" +
    "            <h2 class=\"text-center\">Registration</h2>\n" +
    "            <cm-notification-bar></cm-notification-bar>\n" +
    "            <form name=\"form\" novalidate role=\"form\">\n" +
    "                <div id=\"patient-username\" class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-tag\"></i></span>\n" +
    "                        <input id=\"register-username\" class=\"form-control\" pattern=\"[A-Za-z0-9.]{3,20}\" placeholder=\"Username\" type=\"text\" \n" +
    "                               ng-model=\"registration.UserName\" \n" +
    "                               watch-change=\"check_username()\" \n" +
    "                               required autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-username-errors\" class=\"form-group\">\n" +
    "                    <div id=\"un-invalid-length\" ng-hide=\"Username_Valid_length\">\n" +
    "                        <font color=\"red\">Username must be 3-20 characters long.</font>\n" +
    "                    </div>\n" +
    "                    <div id=\"un-invalid-symbol\" ng-hide=\"Username_Valid_symbol\">\n" +
    "                        <font color=\"red\">Username must only contain letters and numbers.</font>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-email\" class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\" id=\"basic-addon1\">@</span>\n" +
    "                        <input id=\"register-email\" class=\"form-control\" placeholder=\"Email\" type=\"email\" \n" +
    "                               ng-model=\"registration.Email\" \n" +
    "                               required autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-name\" class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <input id=\"user-first\" class=\"form-control\" pattern=\"[A-Za-z]{1,}\" placeholder=\"First Name\" type=\"text\" \n" +
    "                               ng-model=\"registration.FirstName\" \n" +
    "                               ng-change=\"check_firstName()\" \n" +
    "                               required>\n" +
    "                        <input id=\"user-last\" class=\"form-control\" pattern=\"[A-Za-z]{1,}\" placeholder=\"Last Name\" type=\"text\" \n" +
    "                               ng-model=\"registration.LastName\" \n" +
    "                               ng-change=\"check_lastName()\" \n" +
    "                               required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-name-errors\" class=\"form-group\">\n" +
    "                    <div id=\"fn-invalid\" ng-hide=\"Firstname_Valid\">\n" +
    "                        <font color=\"red\">First name must only contain letters.</font>\n" +
    "                    </div>\n" +
    "                    <div id=\"ln-invalid\" ng-hide=\"Lastname_Valid\">\n" +
    "                        <font color=\"red\">Last name must only contain letters.</font>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-password\" class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                        <input id=\"user-password\" class=\"form-control\" pattern=\"(?=(.*\\d))(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*[^A-Za-z0-9])).{6,}\" \n" +
    "                               placeholder=\"Enter password\" type=\"password\" \n" +
    "                               ng-model=\"registration.Password\" \n" +
    "                               watch-change=\"check_password()\" \n" +
    "                               required>\n" +
    "                        <input id=\"user-confirmpassword\" class=\"form-control\" placeholder=\"Confirm Password\" type=\"password\" \n" +
    "                               ng-model=\"registration.ConfirmPassword\" \n" +
    "                               ng-change=\"compare_passwords()\" \n" +
    "                               required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-password-errors\" class=\"form-group\">\n" +
    "                    <div id=\"pw-invalid\" ng-hide=\"Password_Valid\">\n" +
    "                        <font color=\"red\">Password invalid:</font>\n" +
    "                        <ul style=\"margin-bottom:5px\">\n" +
    "                            <li id=\"pw-short\" ng-show=\"Password_Short\">\n" +
    "                                <font color=\"red\">must be at least six characters</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nodigit\" ng-hide=\"Password_Digit\">\n" +
    "                                <font color=\"red\">must contain a digit</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-noupper\" ng-hide=\"Password_Upper\">\n" +
    "                                <font color=\"red\">must contain an upper case character</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nolower\" ng-hide=\"Password_Lower\">\n" +
    "                                <font color=\"red\">must contain a lower case character</font>\n" +
    "                            </li>\n" +
    "                            <li id=\"pw-nospecial\" ng-hide=\"Password_Special\">\n" +
    "                                <font color=\"red\">must contain a special character</font>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div id=\"pw-nomatch\" ng-hide=\"Passwords_Match\">\n" +
    "                        <font color=\"red\">Passwords must match!</font>\n" +
    "                    </div>\n" +
    "                </div>   \n" +
    "                <div id=\"patient-phone\" class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-phone\"></i></span>\n" +
    "                        <input id=\"register-phonenumber\" class=\"form-control\" placeholder=\"(xxx) xxx-xxxx\" type=\"text\" \n" +
    "                               ng-model=\"data.PhoneNumber\" \n" +
    "                               ui-mask=\"(999) 999-9999\" \n" +
    "                               required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"patient-birthday-gender\" class=\"form-group\">\n" +
    "                    <div class=\"form-inline\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <span class=\"input-group-addon\"><i class=\"fa fa-birthday-cake\"></i></span>\n" +
    "                                <div class=\"form-inline\">\n" +
    "                                    <input type=\"text\" style=\"width:319px\" id=\"register-DOB\" class=\"form-control\" \n" +
    "                                           ng-model=\"dt\" \n" +
    "                                           ng-click=\"open($event)\" \n" +
    "                                           datepicker-popup=\"{{format}}\" \n" +
    "                                           placeholder=\"YYYY-MM-DD\" \n" +
    "                                           show-button-bar=\"false\" \n" +
    "                                           is-open=\"opened\" \n" +
    "                                           datepicker-options=\"dateOptions\" \n" +
    "                                           ng-required=\"true\" \n" +
    "                                           close-text=\"Close\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <span class=\"input-group-addon\"><i class=\"fa fa-male\"></i> / <i class=\"fa fa-female\"></i></span>\n" +
    "                                <select required class=\"form-control\" ng-model=\"registration.Gender\" aria-expanded=\"false\">\n" +
    "                                    <option class=\"placeholder\" selected disabled value=\"\">Gender</option>\n" +
    "                                    <option value=\"male\">Male</option>\n" +
    "                                    <option value=\"female\">Female</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <button id=\"register-btn\" class=\"btn btn-primary btn-block btn-lg\" type=\"submit\" \n" +
    "                            ng-click=\"register()\" \n" +
    "                            ng-disabled=\"form.$invalid || data.isSubmitting\">Register</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <div class=\"text-center\">\n" +
    "                <strong>Already have an account? <a ui-sref=\"login\" title=\"Log in here\">Log in here</a></strong>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("sso/sso.login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sso/sso.login.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"well col-md-6 col-md-offset-3\">\n" +
    "        <h2 class=\"text-center\">Automatic Login</h2>\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <p>Attempting to log you in automatically from {{ssoProvider}}</p>      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("supporter/supporter.add.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("supporter/supporter.add.tpl.html",
    "<form name=\"form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Register New Supporter</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\">\n" +
    "        <cm-notification-bar></cm-notification-bar>\n" +
    "        <div id=\"supporter-email\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\" id=\"basic-addon1\">@</span>\n" +
    "                <input id=\"register-email\" class=\"form-control\" placeholder=\"Email\" type=\"email\"\n" +
    "                       ng-model=\"creator.Email\"\n" +
    "                       required autofocus>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"supporter-name\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"user-first\" class=\"form-control\" placeholder=\"First Name\" type=\"text\"\n" +
    "                       ng-model=\"creator.FirstName\"\n" +
    "                       ng-change=\"check_firstName()\"\n" +
    "                       required>\n" +
    "                <input id=\"user-last\" class=\"form-control\" placeholder=\"Last Name\" type=\"text\"\n" +
    "                       ng-model=\"creator.LastName\"\n" +
    "                       ng-change=\"check_lastName()\"\n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"supporter-name-errors\" class=\"form-group\">\n" +
    "            <div id=\"fn-invalid\" ng-hide=\"Firstname_Valid\">\n" +
    "                <font color=\"red\">First name must only contain letters.</font>\n" +
    "            </div>\n" +
    "            <div id=\"ln-invalid\" ng-hide=\"Lastname_Valid\">\n" +
    "                <font color=\"red\">Last name must only contain letters.</font>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"supporter-phone\" class=\"form-group\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"fa fa-phone\"></i></span>\n" +
    "                <input id=\"register-phonenumber\" class=\"form-control\" placeholder=\"(xxx) xxx-xxxx\" type=\"text\"\n" +
    "                       ng-model=\"data.PhoneNumber\"\n" +
    "                       ui-mask=\"(999) 999-9999\"\n" +
    "                       required>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"supporter-birthday-gender\" class=\"form-group\">\n" +
    "            <div class=\"form-inline\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-birthday-cake\"></i></span>\n" +
    "                        <div class=\"form-inline\">\n" +
    "                            <input type=\"text\" style=\"width:319px\" id=\"admin-DOB\" class=\"form-control\" \n" +
    "                                   ng-model=\"dt\" \n" +
    "                                   ng-click=\"open($event)\"\n" +
    "                                   datepicker-popup=\"{{format}}\"\n" +
    "                                   placeholder=\"YYYY-MM-DD\"\n" +
    "                                   show-button-bar=\"false\"\n" +
    "                                   is-open=\"opened\"\n" +
    "                                   datepicker-options=\"dateOptions\"\n" +
    "                                   ng-required=\"true\"\n" +
    "                                   close-text=\"Close\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"fa fa-male\"></i> /  <i class=\"fa fa-female\"></i></span>\n" +
    "                        <select required class=\"form-control\" ng-model=\"creator.Gender\" aria-expanded=\"false\">\n" +
    "                            <option class=\"placeholder\" selected disabled value=\"\">Gender</option>\n" +
    "                            <option value=\"male\">Male</option>\n" +
    "                            <option value=\"female\">Female</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button id=\"register-btn\" style=\"padding-top:5px\" class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" \n" +
    "                    ng-click=\"create()\" \n" +
    "                    ng-disabled=\"form.$invalid || data.isSubmitting\">\n" +
    "                Register\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("supporter/supporter.meds.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("supporter/supporter.meds.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h2 class=\"text-center\">Medications for: {{patient.LastName}}, {{patient.FirstName}}</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <table id=\"prescription-list\" class=\"table table-striped table-hover\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>\n" +
    "                    <a href=\"#\" ng-click=\"orderByField='MedicationName'; reverseSort = !reverseSort\">\n" +
    "                        Medication\n" +
    "                    </a>\n" +
    "                    <span class=\"fa\"\n" +
    "                          ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                          ng-show=\"orderByField == 'MedicationName'\"></span>\n" +
    "                </th>\n" +
    "                <th>Frequency</th>\n" +
    "                <th>Dosage</th>\n" +
    "                <th>Notes</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"prescription in prescriptions | orderBy:orderByField:reverseSort | filter:isActive\">\n" +
    "                <td>{{prescription.MedicationName}}</td>\n" +
    "                <td>{{prescription.Frequency}}</td>\n" +
    "                <td>{{prescription.Dosage}}</td>\n" +
    "                <td>{{prescription.Notes}}</td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button id=\"close-meds-btn\" class=\"btn btn-danger btn-large center-block\" ng-click=\"$dismiss()\">Close</button>\n" +
    "</div>");
}]);

angular.module("supporter/supporter.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("supporter/supporter.tpl.html",
    "<div class=\"col-md-10 col-md-offset-1\">\n" +
    "<h2>\n" +
    "    \n" +
    "</h2>\n" +
    "<table id=\"supporter-list\" class=\"table table-striped table-hover\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th>\n" +
    "                <a href=\"#\" ng-click=\"orderByField='Name'; reverseSort = !reverseSort\">\n" +
    "                    Care Team\n" +
    "                </a>\n" +
    "                <span class=\"fa\"\n" +
    "                      ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                      ng-show=\"orderByField == 'Name'\"></span>\n" +
    "            </th>\n" +
    "            <th>\n" +
    "                <a href=\"#\" ng-click=\"orderByField=['Patient.LastName', 'Patient.FirstName']; reverseSort = !reverseSort\">\n" +
    "                    Patient Name\n" +
    "                </a>\n" +
    "                <span class=\"fa\"\n" +
    "                      ng-class=\"reverseSort ? 'fa-caret-up' : 'fa-caret-down'\"\n" +
    "                      ng-show=\"orderByField == ['Patient.LastName', 'Patient.FirstName']\"></span>\n" +
    "            </th>\n" +
    "            <th>Medications</th>\n" +
    "            <th>Physicians</th>\n" +
    "            <th>Nurses</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"sTeam in sTeams | orderBy:orderByField:reverseSort\">\n" +
    "            <td>{{sTeam.Name}}</td>\n" +
    "            <td>{{sTeam.Patient.LastName}}, {{sTeam.Patient.FirstName}}</td>\n" +
    "            <td>\n" +
    "                <button id=\"medication-info\" ng-click=\"medicationHistory(sTeam.Patient)\" class=\"btn btn-default\">Click Me!</button>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"provider in sTeam.Providers | filter:{Roles:'Physician'}\" >{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"provider in sTeam.Providers | filter:{Roles:'Nurse'}\" >{{provider.LastName}}, {{provider.FirstName}} - {{provider.Roles[0]}}</li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "</div>");
}]);
