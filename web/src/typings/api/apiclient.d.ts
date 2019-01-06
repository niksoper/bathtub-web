declare module Api{
/**
The AccountSearchResult DTO/Resource used within the Api Clients
*/
interface AccountSearchResult {
  profileId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
  lastLogin: string;
  isLocked: boolean;
  organisation: string;
  passwordResetCode: string;
  verificationCode: string;
  state: Api.AccountState /* enum */;
}
/**
The Album DTO/Resource used within the Api Clients
*/
interface Album {
  owner: Api.ProfileSummary;
  updatedOn: string;
  createdOn: string;
  id: string;
  name: string;
  contentCount: number /* integer */;
  contents: Api.ContentSummary[];
  tags: Api.ITag[];
}
/**
The ProfileSummary DTO/Resource used within the Api Clients
*/
interface ProfileSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  thumbnail: Api.ProfilePicture;
  name: string;
  type: Api.TagType /* enum */;
}
/**
The ContentSummary DTO/Resource used within the Api Clients
*/
interface ContentSummary {
  id: string;
  name: string;
  original: Api.File;
  thumbnail: Api.File;
  previews: Api.File[];
}
/**
The ITag DTO/Resource used within the Api Clients
*/
interface ITag {
  name: string;
  type: Api.TagType /* enum */;
  id: string;
}
/**
The ProfilePicture DTO/Resource used within the Api Clients
*/
interface ProfilePicture {
  x1: number /* integer */;
  x2: number /* integer */;
  y1: number /* integer */;
  y2: number /* integer */;
  relative: boolean;
  fileId: string;
  uri: string;
}
/**
The File DTO/Resource used within the Api Clients
*/
interface File {
  id: string;
  size: number /* integer */;
  metadata: Api.IFileMetadata;
  typeId: string;
  uri: string;
  category: Api.FileTypeCategory /* enum */;
  extension: string;
}
/**
The IFileMetadata DTO/Resource used within the Api Clients
*/
interface IFileMetadata {
  type: Api.FileMetadataType /* enum */;
}
/**
The PagedCollectionOfAlbumSummary DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfAlbumSummary {
  next: string;
  data: Api.AlbumSummary[];
  total: number /* integer */;
}
/**
The AlbumSummary DTO/Resource used within the Api Clients
*/
interface AlbumSummary {
  id: string;
  name: string;
  owner: Api.ProfileSummary;
  createdOn: string;
  contents: Api.ContentSummary[];
  contentCount: number /* integer */;
}
/**
The AlbumCreation DTO/Resource used within the Api Clients
*/
interface AlbumCreation {
  name: string;
  contents: string[];
}
/**
The LoginRequest DTO/Resource used within the Api Clients
*/
interface LoginRequest {
  email: string;
  password: string;
}
/**
The Profile DTO/Resource used within the Api Clients
*/
interface Profile {
  email: string;
  homeTelephone: string;
  mobileTelephone: string;
  skypeName: string;
  dateOfBirth: Api.SimpleDate;
  gender: Api.Gender /* enum */;
  addresses: Api.Address[];
  id: string;
  firstName: string;
  lastName: string;
  thumbnail: Api.ProfilePicture;
  pendingInvitedById: string;
  pendingRequestedById: string;
  isRelated: boolean;
}
/**
The SimpleDate DTO/Resource used within the Api Clients
*/
interface SimpleDate {
  day: number /* integer */;
  month: number /* integer */;
  year: number /* integer */;
}
/**
The Address DTO/Resource used within the Api Clients
*/
interface Address {
  firstLine: string;
  secondLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
/**
The AdminLoginResult DTO/Resource used within the Api Clients
*/
interface AdminLoginResult {
  email: string;
  roles: string[];
}
/**
The ChangePasswordModel DTO/Resource used within the Api Clients
*/
interface ChangePasswordModel {
  oldPassword: string;
  password: string;
}
/**
The ForgotPasswordModel DTO/Resource used within the Api Clients
*/
interface ForgotPasswordModel {
  email: string;
}
/**
The ResetPasswordModel DTO/Resource used within the Api Clients
*/
interface ResetPasswordModel {
  email: string;
  code: string;
  password: string;
}
/**
The Content DTO/Resource used within the Api Clients
*/
interface Content {
  createdOn: string;
  owner: Api.ProfileSummary;
  location: Api.Location;
  tags: Api.ITag[];
  systemTags: Api.ITag[];
  id: string;
  name: string;
  original: Api.File;
  thumbnail: Api.File;
  previews: Api.File[];
}
/**
The Location DTO/Resource used within the Api Clients
*/
interface Location {
  name: string;
  longitude: number;
  latitude: number;
}
/**
The PagedCollectionOfContentSummary DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfContentSummary {
  next: string;
  data: Api.ContentSummary[];
  total: number /* integer */;
}
/**
The ContentCreation DTO/Resource used within the Api Clients
*/
interface ContentCreation {
  name: string;
  uri: string;
  createdOn: string;
  clientInfo: Api.ClientInfo;
}
/**
The ClientInfo DTO/Resource used within the Api Clients
*/
interface ClientInfo {
  clientName: string;
  clientVersion: string;
  operatingSystemName: string;
  operatingSystemVersion: string;
  deviceName: string;
}
/**
The ContentDeletion DTO/Resource used within the Api Clients
*/
interface ContentDeletion {
  ids: string[];
}
/**
The PagedCollectionOfContentProcessingSummary DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfContentProcessingSummary {
  next: string;
  data: Api.ContentProcessingSummary[];
  total: number /* integer */;
}
/**
The ContentProcessingSummary DTO/Resource used within the Api Clients
*/
interface ContentProcessingSummary {
  id: string;
  name: string;
  original: Api.File;
  status: Api.ContentState /* enum */;
}
/**
The Country DTO/Resource used within the Api Clients
*/
interface Country {
  id: string;
  regions: Api.Region[];
  order: number /* integer */;
  name: string;
  smallCode: string;
  code: string;
}
/**
The Region DTO/Resource used within the Api Clients
*/
interface Region {
  order: number /* integer */;
  name: string;
  smallCode: string;
  code: string;
}
/**
The PagedCollectionOfFamilyGroup DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfFamilyGroup {
  next: string;
  data: Api.FamilyGroup[];
  total: number /* integer */;
}
/**
The FamilyGroup DTO/Resource used within the Api Clients
*/
interface FamilyGroup {
  owner: Api.ProfileSummary;
  id: string;
  familyName: string;
  members: Api.ProfileSummary[];
  pendingMembers: Api.Invite[];
  unusedInvites: number /* integer */;
}
/**
The Invite DTO/Resource used within the Api Clients
*/
interface Invite {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  message: string;
  invitedByFirstName: string;
  invitedByLastName: string;
  relationship: string;
  inverseRelationship: string;
  invitedOn: string;
}
/**
The UploadFileInfo DTO/Resource used within the Api Clients
*/
interface UploadFileInfo {
  name: string;
  uri: string;
}
/**
The FileType DTO/Resource used within the Api Clients
*/
interface FileType {
  id: string;
  name: string;
  category: Api.FileTypeCategory /* enum */;
  extensions: string[];
  mimeTypes: string[];
}
/**
The PagedCollectionOfGroup DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfGroup {
  next: string;
  data: Api.Group[];
  total: number /* integer */;
}
/**
The Group DTO/Resource used within the Api Clients
*/
interface Group {
  id: string;
  name: string;
  members: Api.ProfileSummary[];
}
/**
The InviteRegisterModel DTO/Resource used within the Api Clients
*/
interface InviteRegisterModel {
  claim: Api.InviteClaim;
  agreesWithTerms: boolean;
}
/**
The InviteClaim DTO/Resource used within the Api Clients
*/
interface InviteClaim {
  emailAddress: string;
  code: string;
}
/**
The TransferInviteModel DTO/Resource used within the Api Clients
*/
interface TransferInviteModel {
  transferEmail: string;
  claim: Api.InviteClaim;
  agreesWithTerms: boolean;
}
/**
The MobileInviteVerifyModel DTO/Resource used within the Api Clients
*/
interface MobileInviteVerifyModel {
  claim: Api.InviteClaim;
  email: string;
  code: string;
  firstName: string;
  lastName: string;
  password: string;
}
/**
The PagedCollectionOfInvite DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfInvite {
  next: string;
  data: Api.Invite[];
  total: number /* integer */;
}
/**
The PagedCollectionOfInviteRequest DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfInviteRequest {
  next: string;
  data: Api.InviteRequest[];
  total: number /* integer */;
}
/**
The InviteRequest DTO/Resource used within the Api Clients
*/
interface InviteRequest {
  id: string;
  message: string;
  owner: Api.ProfileSummary;
}
/**
The ResendInviteModel DTO/Resource used within the Api Clients
*/
interface ResendInviteModel {
  email: string;
}
/**
The ResendInviteVerifyModel DTO/Resource used within the Api Clients
*/
interface ResendInviteVerifyModel {
  transferEmail: string;
  inviteClaim: Api.InviteClaim;
}
/**
The PagedCollectionOfLifeline DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfLifeline {
  next: string;
  data: Api.Lifeline[];
  total: number /* integer */;
}
/**
The Lifeline DTO/Resource used within the Api Clients
*/
interface Lifeline {
  id: string;
  owner: Api.Profile;
  createdOn: string;
  sharedWith: Api.ProfileSummary[];
}
/**
The SharingMetadata DTO/Resource used within the Api Clients
*/
interface SharingMetadata {
  groups: string[];
  users: string[];
}
/**
The PagedCollectionOfLifelinePost DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfLifelinePost {
  next: string;
  data: Api.LifelinePost[];
  total: number /* integer */;
}
/**
The LifelinePost DTO/Resource used within the Api Clients
*/
interface LifelinePost {
  id: string;
  owner: Api.ProfileSummary;
  body: string;
  title: string;
  iconKey: string;
  contents: Api.ContentSummary[];
  albums: Api.AlbumSnapshot[];
  eventDate: Api.SimpleDate;
  updatedOn: string;
  createdOn: string;
  comments: Api.Comment[];
}
/**
The AlbumSnapshot DTO/Resource used within the Api Clients
*/
interface AlbumSnapshot {
  id: string;
  name: string;
  contentCount: number /* integer */;
  contents: Api.ContentSummary[];
  tags: Api.ITag[];
}
/**
The Comment DTO/Resource used within the Api Clients
*/
interface Comment {
  id: string;
  text: string;
  owner: Api.ProfileSummary;
  createdOn: string;
}
/**
The LifelinePostCreation DTO/Resource used within the Api Clients
*/
interface LifelinePostCreation {
  body: string;
  contents: string[];
  albums: string[];
  iconKey: string;
  eventDate: Api.SimpleDate;
  title: string;
  lifelineId: string;
}
/**
The CommentCreation DTO/Resource used within the Api Clients
*/
interface CommentCreation {
  text: string;
}
/**
The SubscriptionOverview DTO/Resource used within the Api Clients
*/
interface SubscriptionOverview {
  subscription: Api.Subscription;
  giftedByProfile: Api.ProfileSummary;
}
/**
The Subscription DTO/Resource used within the Api Clients
*/
interface Subscription {
  id: string;
  isSuspended: boolean;
  createdOn: string;
  lastPaymentDate: string;
  lapsesOn: string;
  expiresOn: string;
  voucher: Api.ClaimedVoucher;
}
/**
The ClaimedVoucher DTO/Resource used within the Api Clients
*/
interface ClaimedVoucher {
  voucherId: string;
  orgShortName: string;
  orgFullName: string;
  familySize: number /* integer */;
  invitesUsed: number /* integer */;
}
/**
The ContentStatistic DTO/Resource used within the Api Clients
*/
interface ContentStatistic {
  storageUsed: number /* integer */;
  count: number /* integer */;
}
/**
The NotificationUserSetting DTO/Resource used within the Api Clients
*/
interface NotificationUserSetting {
  userId: string;
  eventSettings: Api.NotificationUserEventSetting[];
  devices: Api.NotificationUserDevice[];
}
/**
The NotificationUserEventSetting DTO/Resource used within the Api Clients
*/
interface NotificationUserEventSetting {
  id: string;
  name: string;
  groupName: string;
  smtp: Api.NotificationTransportSetting;
  device: Api.NotificationTransportSetting;
}
/**
The NotificationUserDevice DTO/Resource used within the Api Clients
*/
interface NotificationUserDevice {
  id: string;
  name: string;
  transport: string;
  token: string;
}
/**
The NotificationTransportSetting DTO/Resource used within the Api Clients
*/
interface NotificationTransportSetting {
  frequency: Api.NotificationFrequency /* enum */;
  isConfigurable: boolean;
}
/**
The PagedCollectionOfUserNotification DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfUserNotification {
  next: string;
  data: Api.UserNotification[];
  total: number /* integer */;
}
/**
The UserNotification DTO/Resource used within the Api Clients
*/
interface UserNotification {
  id: string;
  eventName: string;
  notificationEvent: Api.INotificationEvent;
  when: string;
  ack: boolean;
}
/**
The INotificationEvent DTO/Resource used within the Api Clients
*/
interface INotificationEvent {
  userId: string;
  when: string;
  attachments: Api.INotificationAttachment[];
}
/**
The INotificationAttachment DTO/Resource used within the Api Clients
*/
interface INotificationAttachment {

}
/**
The Organisation DTO/Resource used within the Api Clients
*/
interface Organisation {
  guestInvites: number /* integer */;
  shortName: string;
  fullName: string;
}
/**
The OrganisationCreate DTO/Resource used within the Api Clients
*/
interface OrganisationCreate {
  guestInvites: string;
  shortName: string;
  fullName: string;
}
/**
The OrganisationUser DTO/Resource used within the Api Clients
*/
interface OrganisationUser {
  orgFullName: string;
  email: string;
  orgShortName: string;
}
/**
The OrganisationUserCreate DTO/Resource used within the Api Clients
*/
interface OrganisationUserCreate {
  email: string;
  orgShortName: string;
}
/**
The OrganisationUserCreated DTO/Resource used within the Api Clients
*/
interface OrganisationUserCreated {
  passwordResetCode: string;
  orgFullName: string;
  email: string;
  orgShortName: string;
}
/**
The OrganisationVoucherCreate DTO/Resource used within the Api Clients
*/
interface OrganisationVoucherCreate {
  expiryDate: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
/**
The OrganisationVoucherIssued DTO/Resource used within the Api Clients
*/
interface OrganisationVoucherIssued {
  voucherClaimUrl: string;
  expiryDate: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
/**
The VoucherRenewalCreate DTO/Resource used within the Api Clients
*/
interface VoucherRenewalCreate {
  expiryDate: string;
}
/**
The IssuedVoucherModel DTO/Resource used within the Api Clients
*/
interface IssuedVoucherModel {
  orgShortName: string;
  orgFullName: string;
  claimEmail: string;
  voucherId: string;
  firstName: string;
  lastName: string;
  issuedOn: string;
  issuedByUser: string;
  claimedBy: string;
  claimedOn: string;
  expiresOn: string;
}
/**
The PagedCollectionOfPerson DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfPerson {
  next: string;
  data: Api.Person[];
  total: number /* integer */;
}
/**
The Person DTO/Resource used within the Api Clients
*/
interface Person {
  id: string;
  name: string;
  thumbnailUri: string;
  type: Api.TagType /* enum */;
}
/**
The PagedCollectionOfPost DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfPost {
  next: string;
  data: Api.Post[];
  total: number /* integer */;
}
/**
The Post DTO/Resource used within the Api Clients
*/
interface Post {
  id: string;
  timeCapsule: Api.TimeCapsuleMetadata;
  body: string;
  sharedWith: Api.ProfileSummary[];
  owner: Api.ProfileSummary;
  createdOn: string;
  contents: Api.ContentSummary[];
  albums: Api.AlbumSnapshot[];
  comments: Api.Comment[];
}
/**
The TimeCapsuleMetadata DTO/Resource used within the Api Clients
*/
interface TimeCapsuleMetadata {
  sendDate: string;
  status: Api.TimeCapsuleStatus /* enum */;
  createdOn: string;
}
/**
The PostCreation DTO/Resource used within the Api Clients
*/
interface PostCreation {
  body: string;
  contents: string[];
  albums: string[];
  timeCapsule: string;
  sharing: Api.SharingMetadata;
}
/**
The PagedCollectionOfProfileSummary DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfProfileSummary {
  next: string;
  data: Api.ProfileSummary[];
  total: number /* integer */;
}
/**
The IProfile DTO/Resource used within the Api Clients
*/
interface IProfile {
  firstName: string;
  lastName: string;
  thumbnail: Api.ProfilePicture;
  pendingInvitedById: string;
  pendingRequestedById: string;
  isRelated: boolean;
  id: string;
}
/**
The ProfileMinimal DTO/Resource used within the Api Clients
*/
interface ProfileMinimal {
  id: string;
  firstName: string;
  lastName: string;
  thumbnail: Api.ProfilePicture;
  pendingInvitedById: string;
  pendingRequestedById: string;
  isRelated: boolean;
}
/**
The ValidationConstraint DTO/Resource used within the Api Clients
*/
interface ValidationConstraint {
  minTagLength: number /* integer */;
  maxTagLength: number /* integer */;
  minPersonNameLength: number /* integer */;
  maxPersonNameLength: number /* integer */;
  minContentNameLength: number /* integer */;
  maxContentNameLength: number /* integer */;
  minLocationNameLength: number /* integer */;
  maxLocationNameLength: number /* integer */;
  minCommentTextLength: number /* integer */;
  maxCommentTextLength: number /* integer */;
  minGroupNameLength: number /* integer */;
  maxGroupNameLength: number /* integer */;
  minFirstNameLength: number /* integer */;
  maxFirstNameLength: number /* integer */;
  minLastNameLength: number /* integer */;
  maxLastNameLength: number /* integer */;
  minInviteMessageLength: number /* integer */;
  maxInviteMessageLength: number /* integer */;
  minPasswordLength: number /* integer */;
  maxPasswordLength: number /* integer */;
  maxInvites: number /* integer */;
  minPostLength: number /* integer */;
  maxPostLength: number /* integer */;
  minAppointmentTitleLength: number /* integer */;
  maxAppointmentTitleLength: number /* integer */;
  minHomePhoneLength: number /* integer */;
  maxHomePhoneLength: number /* integer */;
  minMobilePhoneLength: number /* integer */;
  maxMobilePhoneLength: number /* integer */;
  minSkypeNameLength: number /* integer */;
  maxSkypeNameLength: number /* integer */;
  minAddressFirstLength: number /* integer */;
  maxAddressFirstLineLength: number /* integer */;
  minAddressSecondLength: number /* integer */;
  maxAddressSecondLineLength: number /* integer */;
  minCityLength: number /* integer */;
  maxCityLength: number /* integer */;
  minStateLength: number /* integer */;
  maxStateLength: number /* integer */;
  minCountryLength: number /* integer */;
  maxCountryLength: number /* integer */;
  minZipCodeLength: number /* integer */;
  maxZipCodeLength: number /* integer */;
  minOrganisationShortName: number /* integer */;
  maxOrganisationShortName: number /* integer */;
  voucherCodeLength: number /* integer */;
}
/**
The AppleTransaction DTO/Resource used within the Api Clients
*/
interface AppleTransaction {
  productId: string;
  txId: string;
  receipt: string;
}
/**
The AndroidTransaction DTO/Resource used within the Api Clients
*/
interface AndroidTransaction {
  productId: string;
  signature: string;
  receiptData: string;
}
/**
The PagedCollectionOfTag DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfTag {
  next: string;
  data: Api.Tag[];
  total: number /* integer */;
}
/**
The Tag DTO/Resource used within the Api Clients
*/
interface Tag {
  id: string;
  name: string;
  type: Api.TagType /* enum */;
}
/**
The PagedCollectionOfSystemTag DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfSystemTag {
  next: string;
  data: Api.SystemTag[];
  total: number /* integer */;
}
/**
The SystemTag DTO/Resource used within the Api Clients
*/
interface SystemTag {
  id: string;
  name: string;
  type: Api.TagType /* enum */;
}
/**
The PagedCollectionOfTimeCapsule DTO/Resource used within the Api Clients
*/
interface PagedCollectionOfTimeCapsule {
  next: string;
  data: Api.TimeCapsule[];
  total: number /* integer */;
}
/**
The TimeCapsule DTO/Resource used within the Api Clients
*/
interface TimeCapsule {
  id: string;
  message: string;
  recipients: Api.ProfileSummary[];
  contents: Api.ContentSummary[];
  albums: Api.AlbumSnapshot[];
  updatedOn: string;
  sendDate: string;
  status: Api.TimeCapsuleStatus /* enum */;
  createdOn: string;
}
/**
The TimeCapsuleCreation DTO/Resource used within the Api Clients
*/
interface TimeCapsuleCreation {
  message: string;
  sendDate: string;
  recipients: string[];
  contents: string[];
  albums: string[];
  createAsPending: boolean;
}
/**
The DeviceRegistrationChange DTO/Resource used within the Api Clients
*/
interface DeviceRegistrationChange {
  name: string;
  transport: string;
  oldToken: string;
  newToken: string;
}
/**
The RegisterModel DTO/Resource used within the Api Clients
*/
interface RegisterModel {
  agreesWithTerms: boolean;
}
/**
The TransferRegisterModel DTO/Resource used within the Api Clients
*/
interface TransferRegisterModel {
  email: string;
  agreesWithTerms: boolean;
}
/**
The MobileVerifyModel DTO/Resource used within the Api Clients
*/
interface MobileVerifyModel {
  email: string;
  code: string;
  firstName: string;
  lastName: string;
  password: string;
}
/**
The ResendVerifyModel DTO/Resource used within the Api Clients
*/
interface ResendVerifyModel {
  inviteId: string;
  email: string;
}


const enum FileTypeCategory {
  Image = 0,
  Video = 1,
  Audio = 2,
  Document = 3,
  Other = 4
}
const enum SortFilter {
  Name = 0,
  Newest = 1,
  Oldest = 2
}
const enum LifelineTypes {
  All = 0,
  Owned = 1,
  Related = 2
}
const enum AccountState {
  NotSet = 0,
  AwaitingActivation = 1,
  Activated = 2,
  Disabled = 3
}
const enum TagType {
  Text = 0,
  SystemText = 1,
  Person = 2,
  Profile = 3
}
const enum FileMetadataType {
  Image = 0,
  Video = 1,
  Audio = 2
}
const enum Gender {
  Male = 0,
  Female = 1,
  Other = 2
}
const enum ContentState {
  Created = 0,
  Processing = 1,
  Processed = 2,
  Failed = 3
}
const enum NotificationFrequency {
  DoNotSend = 0,
  Immediate = 1
}
const enum TimeCapsuleStatus {
  NotSet = 0,
  Draft = 1,
  Pending = 2,
  Sent = 3,
  Viewed = 4
}


/** Indicate a Void return type */
interface Void {}

/** Indicate a NoContent (204) return type */
interface NoContent {}
}