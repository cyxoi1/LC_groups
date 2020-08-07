import RegisterPage from '../../../pageObjects/register.page';
import user from '../../data/users';
import RegisterStep2 from '../../../pageObjects/registerStep2.page';
import ProfilePage from '../../../pageObjects/profile.page';
import SettingsPasswordPage from '../../../pageObjects/settingsPassword.page';
import LoginPage from '../../../pageObjects/login.page';
import { userDelete } from '../../../helpers/deleteNewUserByAxios';
import expected from '../../data/expected.json';
import { userUpdateRole } from '../../helpers/updateUserRoleByAxios';
import { roles, admin } from '../../data/settingsPasswordData';

describe('NEW USER CHANGE PASSWORD', function () {
  before(function () {
    RegisterPage.open();
    RegisterPage.registerUser(user);
    RegisterStep2.registerUserStep2(user);
    ProfilePage.dropDownUserMenu.click();
    ProfilePage.settingsLink.waitForClickable();
    ProfilePage.settingsLink.click();
    SettingsPasswordPage.passwordTab.click();
  });

  it('TC-003-028 User stays logged in after password has been changed', function () {
    SettingsPasswordPage.updatePassword(user.password, user.newPassword);
    expect(ProfilePage.dropDownUserMenu.isDisplayed()).true;
  });

  it('TC-003-29 User can log in using the new password', function () {
    ProfilePage.logout();
    LoginPage.login(user.email, user.newPassword);
    expect(ProfilePage.badgeRole.getText()).eq(expected.userBadges.new);
    expect(ProfilePage.getLoginConfirmation()).eq(`${user.firstName} ${user.lastName}`);
  });
});

describe('LEARNER CHANGE PASSWORD', () => {
  before(() => {
    ProfilePage.logout();
    LoginPage.login(user.email, user.newPassword);
    ProfilePage.dropDownUserMenu.click();
    ProfilePage.settingsLink.waitForClickable();
    ProfilePage.settingsLink.click();
    SettingsPasswordPage.passwordTab.click();
  });
  it('Should update role from new to Learner', async () => {
    const res = await userUpdateRole(user.email, user.newPassword, roles.learner);
    expect(res.success).eq(true);
  });

  it('TC-003-028 User stays logged in after password has been changed', function () {
    SettingsPasswordPage.updatePassword(user.newPassword, user.password);
    expect(ProfilePage.dropDownUserMenu.isDisplayed()).true;
  });

  it('TC-003-29 User can log in using the new password', function () {
    ProfilePage.logout();
    LoginPage.login(user.email, user.password);
    expect(ProfilePage.badgeRole.getText()).eq(expected.userBadges.learner);
    expect(ProfilePage.getLoginConfirmation()).eq(`${user.firstName} ${user.lastName}`);
  });
});

describe('STUDENT CHANGE PASSWORD', () => {
  before(() => {
    ProfilePage.logout();
    LoginPage.login(user.email, user.password);
    ProfilePage.dropDownUserMenu.click();
    ProfilePage.settingsLink.waitForClickable();
    ProfilePage.settingsLink.click();
    SettingsPasswordPage.passwordTab.click();
  });

  it('Should update role from Learner to Student', async () => {
    const res = await userUpdateRole(user.email, user.password, roles.student);
    expect(res.success).eq(true);
  });

  it('TC-003-028 User stays logged in after password has been changed', function () {
    SettingsPasswordPage.updatePassword(user.password, user.newPassword);
    expect(ProfilePage.dropDownUserMenu.isDisplayed()).true;
  });

  it('TC-003-29 User can log in using the new password', function () {
    ProfilePage.logout();
    LoginPage.login(user.email, user.newPassword);
    expect(ProfilePage.badgeRole.getText()).eq(expected.userBadges.student);
    expect(ProfilePage.getLoginConfirmation()).eq(`${user.firstName} ${user.lastName}`);
  });
});

describe('ADMIN CHANGE PASSWORD', () => {
  before(() => {
    ProfilePage.logout();
    LoginPage.login(admin.email, admin.oldPassword);
    ProfilePage.dropDownUserMenu.click();
    ProfilePage.settingsLink.waitForClickable();
    ProfilePage.settingsLink.click();
    SettingsPasswordPage.passwordTab.click();
  });

  it('TC-003-028 User stays logged in after password has been changed', function () {
    SettingsPasswordPage.updatePassword(admin.oldPassword, admin.newPassword);
    expect(ProfilePage.dropDownUserMenu.isDisplayed()).true;
  });

  it('TC-003-29 User can log in using the new password', function () {
    ProfilePage.logout();
    LoginPage.login(admin.email, admin.newPassword);
    expect(ProfilePage.badgeRole.getText()).eq(expected.userBadges.admin);
    expect(ProfilePage.getLoginConfirmation()).eq(`${admin.firstName} ${admin.lastName}`);
  });

  it('Return old password for Admin', function () {
    ProfilePage.dropDownUserMenu.click();
    ProfilePage.settingsLink.waitForClickable();
    ProfilePage.settingsLink.click();
    SettingsPasswordPage.passwordTab.click();
    SettingsPasswordPage.updatePassword(admin.newPassword, admin.oldPassword);
  });
});

after('Should delete user', async () => {
  const res = await userDelete(user.email);
  expect(res.success).eq(true);
});
