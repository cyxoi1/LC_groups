import BasePage from './Base.page';
import LoginPage from './login.page.js';
import user from '../testData/user';
import TopMenuPage from './topMenu.page';

class settingsProfilePage extends BasePage {
  get firstNameIF() {
    return $('#editProfile_firstName');
  }
  get lastNameIF() {
    return $('#editProfile_lastName');
  }
  get phoneIF() {
    return $('#editProfile_phone');
  }
  get aboutFieldRIF() {
    return $('#editProfile_about');
  }
  get myGoalsRIF() {
    return $('#editProfile_goals');
  }
  get countryFieldDDB() {
    return $('#editProfile_countryName');
  }
  get englishLevelDDB() {
    return $('#editProfile_englishLevel');
  }
  get tShirtSizeDDB() {
    return $('#editProfile_tShirtSize');
  }
  get saveBTN() {
    return $('.ant-btn.ant-btn-primary');
  }
}
export default new settingsProfilePage();
