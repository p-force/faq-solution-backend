export enum AuthStatusMessages {
  CREATED = 'Operation Completed Successfully',
  REGISTERED_SUCCESSFULLY = 'Registration Completed Successfully',
  ERROR = 'An Unexpected Error Occurred',
  ERROR_SET_PASSWORD = 'Unable to Set Password. Please Try Again Later.',
  ALREADY_EXISTS = 'An Account with this Email Already Exists',
  INVALID = 'Invalid Login Credentials',
  AUTHORIZED_SUCCESSFULLY = 'Authorization Successful',
  UNAUTHORIZED = 'Error when logging out',
  NOT_FOUND = 'No Account Found with this Email',
  PASSWORD_UPDATED_SUCCESSFULLY = 'Password Updated Successfully',
  INCORRECT_CODE = 'Incorrect Verification Code',
  EXPIRED_CODE = 'Verification Code Expired',
  CODE_NOT_FOUND = 'Verification Code Not Found',
  EXPIRED_TOKEN = 'Token Expired',
  ALREADY_LOGGED_IN = 'Already Logged In',
}
