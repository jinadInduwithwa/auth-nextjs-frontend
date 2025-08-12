// Generic API response structure
export interface ApiResponse<T> {
  isSuccessful: boolean;
  message: string;
  content: T;
}

// VerifyPhone response
export interface VerifyPhoneResponse {
  nullable: boolean;
}

// SignIn response
export interface Member {
  id: number;
  application_number: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  image: string;
  contact_no: string;
  membership_id: number;
  membership: string;
  membership_reg_date: string;
  membership_exp_date: string;
  payment_method: string;
  paymentDate: string;
  membership_amount: string;
  reg_by: string;
  reg_date: string;
  status: string;
  membershipList: Membership[];
  weight: number;
  height: number;
  membershipDuration: string;
  attendanceDate: string;
  hasMembershipWhenAttendance: boolean;
  password: string;
  needPasswordReset: boolean;
  accessToken: string;
  fullSizeImage: string;
  isVerified: boolean;
  verifiedBy: string;
  verifiedDate: string;
  lastSignInDate: string;
  isRejected: boolean;
  rejectedBy: string;
  rejectedNote: string;
  rejectedDate: string;
  isOnlinePaymentAccess: boolean;
  onlinePaymentAccessChangedDate: string;
  isSubscription: boolean;
  isSubscriptionCanceled: boolean;
}

export interface Membership {
  id: number;
  application_no: string;
  member_name: string;
  image: string;
  package_id: string;
  package_name: string;
  package_reg_date: string;
  package_Duration: string;
  package_exp_date: string;
  package_amount: number;
  packageMemberCount: number;
  payment_method: string;
  created_by: string;
  created_date: string;
  approved_by: string;
  approved_date: string;
  status: string;
  cancelledBy: string;
  cancelledDate: string;
  isManuallyCancelled: boolean;
  cancelledReason: string;
  paymentDate: string;
  lastFourDigits: number;
  cardType: string;
  cardHolderName: string;
  provider: string;
  paidAmount: number;
  nextPaymentDate: string;
  payHerePaymentMethod: string;
  orderId: string;
  subscriptionId: string;
  cardNumber: string;
  payHerePaymentId: string;
  isSubscription: boolean;
  isSubscriptionCanceled: boolean;
  membershipMap: MembershipMap[];
}

export interface MembershipMap {
  applicationNo: string;
  membershipId: number;
  name: string;
  image: string;
}

export interface SignInResponse {
  member: Member;
  accessToken: string;
  jwtToken: string;
}

// Register request
export interface RegisterRequest {
  contactNumber: string;
  dateOfBirth: string;
  firstName: string;
  gender: string;
  lastName: string;
  image: string | null;
  fullSizeImage: string | null;
}

// Password change/reset requests
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  phoneNumber: string;
  code: string;
  password: string;
}