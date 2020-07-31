import RegisterPage from '../../../pageObjects/register.page';
import RegisterStep2Page from '../../../pageObjects/registerStep2.page';
import { registerPageTestResult } from '../../testResult/register';
import { newUser } from '../../testData/register';


describe('REGISTER PAGE STEP 2', function () {
  before(() => {
    RegisterStep2Page.open();
  });

  describe('HEADER', function () {
    it('header should be displayed', function () {
      expect(RegisterStep2Page.headerRegisterStep2.isDisplayed());
    });

    it('header has correct text', function () {
      RegisterPage.open();
      RegisterPage.registerUser(newUser);
      expect(RegisterStep2Page.headerRegisterStep2.getText()).eq(
        `Dear ${newUser.firstName} ${newUser.lastName}!\nPlease complete these fields`);
    });
  });

  describe('ELEMENTS ARE DISPLAYED', function () {
    it('Phone field should be displayed', function () {
      expect(RegisterStep2Page.phoneNumber.isDisplayed());
    });

    it('Phone field placeholder has correct text', function () {
      expect(RegisterStep2Page.phoneNumber.getAttribute('placeholder')).eq(
        registerPageTestResult.phoneNumberPlaceholder);
    });

    it('Phone label is displayed', function () {
      expect(RegisterStep2Page.phoneLabel.isDisplayed());
    });

    it('Phone label has correct text', function () {
      expect(RegisterStep2Page.phoneLabel.getText()).eq(
        registerPageTestResult.phoneLabel);
    });

    it('Country field should be displayed', function () {
      expect(RegisterStep2Page.openDropdown.isDisplayed());
    });

    it('Country field has dropdown', function () {
      expect(RegisterStep2Page.openDropdown.isExisting());
    });

    it('Country label is displayed', function () {
      expect(RegisterStep2Page.countryLabel.isDisplayed());
    });

    it('Country label has correct text', function () {
      expect(RegisterStep2Page.countryLabel.getText()).eq(
        registerPageTestResult.countryLabel);
    });

    it('Submit Btn should be displayed', function () {
      expect(RegisterStep2Page.SubmitBtn.isDisplayed());
    });

    it('Submit Btn has correct text', function () {
      expect(RegisterStep2Page.SubmitBtn.getText()).eq(registerPageTestResult.submitBtn);
    });

    it('Skip Btn should be displayed', function () {
      expect(RegisterStep2Page.skipBtn.isDisplayed());
    });

    it('Skip Btn has correct text', function () {
      expect(RegisterStep2Page.skipBtn.getText()).eq(registerPageTestResult.skipBtn);
    });
  });


});


