import * as _ from "underscore";


/**
The main Api Client implementation required to provide execution of the API (http verb based) requests
Implement your transport (window.fetch [whatwg], jquery ajax, etc)
Handle authentication tokens or cookies
*/
export interface IApiClient {
  /**
  Send a request to the Api
  @param method The Http Method
  @param authorization Is authorization required?
  @param url The Request Url
  @param payload The Request Payload
  */
  request<T,R>(method: string, authorization: boolean, url: string, payload?: T) : Promise<IFetchApiResponse<R>>;
}



export interface IFetchApiFailure{
  text?: string;
  json?: any;
}

export interface IFetchApiResponse<T>{
  payload?: T;
  response: {status: number, ok?: boolean};
  failure?: IFetchApiFailure;
}





/**
The base class used for all Api Clients
*/
abstract class ApiClientBase {
  protected buildQueryString(values: {}) {
    var paramsName = _.reject(_.keys(values), p => _.isUndefined(values[p]) ||  _.isNull(values[p]));
    if(!paramsName.length){
      return "";
    }

    return `?${_.map(paramsName,pn => this.buildParam(pn, values[pn])).join("&")}`;
  }

  private buildParam(pn: string, value){
    if (_.isArray(value)) {
      return _.map(value, v => `${pn}=${v}`).join("&")
    }
    return `${pn}=${value}`
  }
}


/**
A generated interface - usage in the generated endpoints will indicate the system was unable to detect a type
*/
export interface IErrorTypeNotFound {
}


/**
The Account Api Client - implements all operations from this logical endpoint
*/
export class AccountClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getByEmail = (email: string) => {
    var qs = this.buildQueryString({"email":email});
    return this.api.request<Api.Void,Api.AccountSearchResult>("get", false, `/accounts${qs}`)
  }

}

/**
The Album Api Client - implements all operations from this logical endpoint
*/
export class AlbumClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Album>("get", false, `/albums/${id}`)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/albums/${id}`)
  }
  
  getAll = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfAlbumSummary>("get", false, `/albums${qs}`)
  }
  
  put = (album : Api.Album) => {
    return this.api.request<Api.Album,Api.Album>("put", false, `/albums`, album)
  }
  
  post = (albumCreation : Api.AlbumCreation) => {
    return this.api.request<Api.AlbumCreation,Api.Album>("post", false, `/albums`, albumCreation)
  }

}

/**
The Auth Api Client - implements all operations from this logical endpoint
*/
export class AuthClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  welcome = () => {
    return this.api.request<Api.Void,Api.NoContent>("get", false, `/auth/welcome`)
  }
  
  login = (model : Api.LoginRequest) => {
    return this.api.request<Api.LoginRequest,Api.Profile>("post", false, `/auth/login`, model)
  }
  
  adminLogin = (model : Api.LoginRequest) => {
    return this.api.request<Api.LoginRequest,Api.AdminLoginResult>("post", false, `/auth/adminlogin`, model)
  }
  
  adminPing = () => {
    return this.api.request<Api.Void,Api.NoContent>("get", false, `/auth/adminping`)
  }
  
  logout = () => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/auth/logout`)
  }
  
  refresh = () => {
    return this.api.request<Api.Void,Api.NoContent>("post", false, `/auth/refresh`)
  }
  
  changePassword = (changePasswordModel : Api.ChangePasswordModel) => {
    return this.api.request<Api.ChangePasswordModel,Api.NoContent>("post", false, `/auth/changePassword`, changePasswordModel)
  }
  
  forgotPassword = (forgotPassword : Api.ForgotPasswordModel) => {
    return this.api.request<Api.ForgotPasswordModel,Api.NoContent>("post", false, `/auth/forgotPassword`, forgotPassword)
  }
  
  resetPassword = (resetPassword : Api.ResetPasswordModel) => {
    return this.api.request<Api.ResetPasswordModel,Api.NoContent>("post", false, `/auth/resetPassword`, resetPassword)
  }
  
  lockUser = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("put", false, `/auth/lockuser/${id}`)
  }
  
  unlockUser = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("put", false, `/auth/unlockuser/${id}`)
  }

}

/**
The Content Api Client - implements all operations from this logical endpoint
*/
export class ContentClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Content>("get", false, `/content/${id}`)
  }
  
  put = (id: string,contentResource : Api.Content) => {
    return this.api.request<Api.Content,Api.Content>("put", false, `/content/${id}`, contentResource)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/content/${id}`)
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,tags?: string[],systemtags?: string[],types?: Api.FileTypeCategory /* enum */[],sortBy?: Api.SortFilter /* enum */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"tags":tags,"systemtags":systemtags,"types":types,"sortBy":sortBy});
    return this.api.request<Api.Void,Api.PagedCollectionOfContentSummary>("get", false, `/content${qs}`)
  }
  
  post = (contentCreation : Api.ContentCreation) => {
    return this.api.request<Api.ContentCreation,string>("post", false, `/content`, contentCreation)
  }
  
  deleteMany = (ids: string[]) => {
    var qs = this.buildQueryString({"ids":ids});
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/content${qs}`)
  }
  
  postDeleteMany = (deletion : Api.ContentDeletion) => {
    return this.api.request<Api.ContentDeletion,Api.NoContent>("post", false, `/content/deletemany`, deletion)
  }
  
  getStatus = (id: string) => {
    return this.api.request<Api.Void,0 | 1 | 2 | 3 /* enum */>("get", false, `/contentstatus/${id}`)
  }

}

/**
The ContentProcessing Api Client - implements all operations from this logical endpoint
*/
export class ContentProcessingClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfContentProcessingSummary>("get", false, `/contentprocessing${qs}`)
  }
  
  getContentProcessing = () => {
    return this.api.request<Api.Void,number /* integer */>("get", false, `/contentprocessing/count`)
  }

}

/**
The Country Api Client - implements all operations from this logical endpoint
*/
export class CountryClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = () => {
    return this.api.request<Api.Void,Api.Country[]>("get", false, `/countries`)
  }

}

/**
The Family Api Client - implements all operations from this logical endpoint
*/
export class FamilyClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getFamilies = () => {
    return this.api.request<Api.Void,Api.PagedCollectionOfFamilyGroup>("get", false, `/families`)
  }

}

/**
The File Api Client - implements all operations from this logical endpoint
*/
export class FileClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  post = (size?: number /* integer */) => {
    var qs = this.buildQueryString({"size":size});
    return this.api.request<Api.Void,Api.UploadFileInfo>("post", false, `/files${qs}`)
  }
  
  put = (id: string) => {
    return this.api.request<Api.Void,Api.UploadFileInfo>("put", false, `/files/${id}`)
  }

}

/**
The FileType Api Client - implements all operations from this logical endpoint
*/
export class FileTypeClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = () => {
    return this.api.request<Api.Void,Api.FileType[]>("get", false, `/filetypes`)
  }

}

/**
The Group Api Client - implements all operations from this logical endpoint
*/
export class GroupClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,filter?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"filter":filter});
    return this.api.request<Api.Void,Api.PagedCollectionOfGroup>("get", false, `/groups${qs}`)
  }
  
  post = (groupResource : Api.Group) => {
    return this.api.request<Api.Group,Api.Group>("post", false, `/groups`, groupResource)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Group>("get", false, `/groups/${id}`)
  }
  
  put = (id: string,groupResource : Api.Group) => {
    return this.api.request<Api.Group,Api.Group>("put", false, `/groups/${id}`, groupResource)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/groups/${id}`)
  }

}

/**
The Invite Api Client - implements all operations from this logical endpoint
*/
export class InviteClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = (code: string,email: string) => {
    var qs = this.buildQueryString({"email":email});
    return this.api.request<Api.Void,Api.Invite>("get", false, `/invites/${code}${qs}`)
  }
  
  register = (registerModel : Api.InviteRegisterModel) => {
    return this.api.request<Api.InviteRegisterModel,Api.NoContent>("post", false, `/invites/register`, registerModel)
  }
  
  transfer = (transfer : Api.TransferInviteModel) => {
    return this.api.request<Api.TransferInviteModel,Api.NoContent>("post", false, `/invites/transfer`, transfer)
  }
  
  verify = (verification : Api.MobileInviteVerifyModel) => {
    return this.api.request<Api.MobileInviteVerifyModel,Api.Profile>("post", false, `/invites/verify`, verification)
  }
  
  getInvites = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfInvite>("get", false, `/invites/sent${qs}`)
  }
  
  getInviteRequests = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfInviteRequest>("get", false, `/invites/requests${qs}`)
  }
  
  claimInvite = (inviteClaim : Api.InviteClaim) => {
    return this.api.request<Api.InviteClaim,Api.ProfileSummary>("post", false, `/invites/claim`, inviteClaim)
  }
  
  acceptInviteRequest = (invitedById: string) => {
    return this.api.request<Api.Void,Api.ProfileSummary>("post", false, `/invites/accept/${invitedById}`)
  }
  
  inviteNew = (inviteResource : Api.Invite) => {
    return this.api.request<Api.Invite,Api.Invite>("post", false, `/invites`, inviteResource)
  }
  
  deleteInvite = (email: string) => {
    var qs = this.buildQueryString({"email":email});
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/invites${qs}`)
  }
  
  rejectInviteRequest = (invitedById: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/invites/reject/${invitedById}`)
  }
  
  resendInvite = (model : Api.ResendInviteModel) => {
    return this.api.request<Api.ResendInviteModel,Api.NoContent>("post", false, `/invites/resend`, model)
  }
  
  inviteUser = (id: string) => {
    return this.api.request<Api.Void,Api.Invite>("post", false, `/invites/user/${id}`)
  }
  
  resendVerify = (verifyModel : Api.ResendInviteVerifyModel) => {
    return this.api.request<Api.ResendInviteVerifyModel,Api.NoContent>("post", false, `/invites/resendVerification`, verifyModel)
  }

}

/**
The Lifeline Api Client - implements all operations from this logical endpoint
*/
export class LifelineClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAllLifeline = (page?: string,pageSize?: number /* integer */,type?: Api.LifelineTypes /* enum */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"type":type});
    return this.api.request<Api.Void,Api.PagedCollectionOfLifeline>("get", false, `/lifelines${qs}`)
  }
  
  shareLifeline = (sharingMetadata : Api.SharingMetadata,lifelineId?: string) => {
    var qs = this.buildQueryString({"lifelineId":lifelineId});
    return this.api.request<Api.SharingMetadata,Api.NoContent>("put", false, `/lifelines${qs}`, sharingMetadata)
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,lifelineId?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"lifelineId":lifelineId});
    return this.api.request<Api.Void,Api.PagedCollectionOfLifelinePost>("get", false, `/lifelineposts${qs}`)
  }
  
  post = (postCreation : Api.LifelinePostCreation) => {
    return this.api.request<Api.LifelinePostCreation,Api.LifelinePost>("post", false, `/lifelineposts`, postCreation)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.LifelinePost>("get", false, `/lifelineposts/${id}`)
  }
  
  put = (id: string,postCreation : Api.LifelinePostCreation) => {
    return this.api.request<Api.LifelinePostCreation,Api.LifelinePost>("put", false, `/lifelineposts/${id}`, postCreation)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/lifelineposts/${id}`)
  }
  
  postComment = (lifelineId: string,postId: string,comment : Api.CommentCreation) => {
    return this.api.request<Api.CommentCreation,Api.Comment>("post", false, `/lifelineposts/${lifelineId}/${postId}/comments`, comment)
  }
  
  deleteComment = (lifelineId: string,postId: string,commentId: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/lifelineposts/${lifelineId}/${postId}/comments/${commentId}`)
  }

}

/**
The My Api Client - implements all operations from this logical endpoint
*/
export class MyClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  profile = () => {
    return this.api.request<Api.Void,Api.Profile>("get", false, `/my/profile`)
  }
  
  subscription = () => {
    return this.api.request<Api.Void,Api.SubscriptionOverview>("get", false, `/my/subscription`)
  }
  
  statistics = () => {
    return this.api.request<Api.Void,Api.ContentStatistic>("get", false, `/my/statistics`)
  }

}

/**
The Notification Api Client - implements all operations from this logical endpoint
*/
export class NotificationClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getUserSettings = () => {
    return this.api.request<Api.Void,Api.NotificationUserSetting>("get", false, `/notificationsettings`)
  }
  
  putUserSettings = (userSetting : Api.NotificationUserSetting) => {
    return this.api.request<Api.NotificationUserSetting,Api.NotificationUserSetting>("put", false, `/notificationsettings`, userSetting)
  }
  
  ackUserNotification = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/notifications/ack/${id}`)
  }
  
  ackAllUserNotification = () => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/notifications/ackall`)
  }
  
  getUserNotifications = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfUserNotification>("get", false, `/notifications${qs}`)
  }

}

/**
The Organisation Api Client - implements all operations from this logical endpoint
*/
export class OrganisationClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Organisation>("get", false, `/organisations/${id}`)
  }
  
  put = (id: string,org : Api.Organisation) => {
    return this.api.request<Api.Organisation,Api.Organisation>("put", false, `/organisations/${id}`, org)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/organisations/${id}`)
  }
  
  post = (org : Api.OrganisationCreate) => {
    return this.api.request<Api.OrganisationCreate,string>("post", false, `/organisations`, org)
  }

}

/**
The OrganisationUser Api Client - implements all operations from this logical endpoint
*/
export class OrganisationUserClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.OrganisationUser>("get", false, `/organisationusers/${id}`)
  }
  
  put = (id: string,user : Api.OrganisationUserCreate) => {
    return this.api.request<Api.OrganisationUserCreate,Api.OrganisationUser>("put", false, `/organisationusers/${id}`, user)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/organisationusers/${id}`)
  }
  
  post = (orgUser : Api.OrganisationUserCreate) => {
    return this.api.request<Api.OrganisationUserCreate,Api.OrganisationUserCreated>("post", false, `/organisationusers`, orgUser)
  }

}

/**
The OrganisationVoucher Api Client - implements all operations from this logical endpoint
*/
export class OrganisationVoucherClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  postOrgShortNameVouchers = (orgShortName: string,vouchers : Api.OrganisationVoucherCreate[]) => {
    return this.api.request<Api.OrganisationVoucherCreate[],Api.OrganisationVoucherIssued[]>("post", false, `/organisations/${orgShortName}/vouchers`, vouchers)
  }
  
  postOrgShortNameOrgReferenceRenewal = (orgShortName: string,orgReference: string,renewal : Api.VoucherRenewalCreate) => {
    return this.api.request<Api.VoucherRenewalCreate,Api.IssuedVoucherModel>("post", false, `/organisations/${orgShortName}/vouchers/${orgReference}/renew`, renewal)
  }
  
  get = (orgShortName: string,orgReference: string) => {
    return this.api.request<Api.Void,Api.IssuedVoucherModel>("get", false, `/organisations/${orgShortName}/vouchers/${orgReference}`)
  }

}

/**
The Person Api Client - implements all operations from this logical endpoint
*/
export class PersonClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,filter?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"filter":filter});
    return this.api.request<Api.Void,Api.PagedCollectionOfPerson>("get", false, `/people${qs}`)
  }
  
  post = (personResource : Api.Person) => {
    return this.api.request<Api.Person,Api.Person>("post", false, `/people`, personResource)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Person>("get", false, `/people/${id}`)
  }
  
  put = (id: string,personResource : Api.Person) => {
    return this.api.request<Api.Person,Api.Person>("put", false, `/people/${id}`, personResource)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/people/${id}`)
  }

}

/**
The Post Api Client - implements all operations from this logical endpoint
*/
export class PostClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfPost>("get", false, `/posts${qs}`)
  }
  
  post = (postCreation : Api.PostCreation) => {
    return this.api.request<Api.PostCreation,Api.Post>("post", false, `/posts`, postCreation)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Post>("get", false, `/posts/${id}`)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/posts/${id}`)
  }
  
  postComment = (postId: string,comment : Api.CommentCreation) => {
    return this.api.request<Api.CommentCreation,Api.Comment>("post", false, `/posts/${postId}/comments`, comment)
  }
  
  deleteComment = (postId: string,commentId: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/posts/${postId}/comments/${commentId}`)
  }

}

/**
The Profile Api Client - implements all operations from this logical endpoint
*/
export class ProfileClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,filter?: string,userId?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"filter":filter,"userId":userId});
    return this.api.request<Api.Void,Api.PagedCollectionOfProfileSummary>("get", false, `/profiles${qs}`)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.IProfile>("get", false, `/profiles/${id}`)
  }
  
  put = (id: string,profile : Api.Profile) => {
    return this.api.request<Api.Profile,Api.Profile>("put", false, `/profiles/${id}`, profile)
  }
  
  getMinimal = (id: string) => {
    return this.api.request<Api.Void,Api.ProfileMinimal>("get", false, `/profiles/minimal/${id}`)
  }
  
  postPicture = (id: string,profilePicture : Api.ProfilePicture) => {
    return this.api.request<Api.ProfilePicture,Api.ProfilePicture>("post", false, `/profiles/${id}/picture`, profilePicture)
  }

}

/**
The ReferenceData Api Client - implements all operations from this logical endpoint
*/
export class ReferenceDataClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getValidation = () => {
    return this.api.request<Api.Void,Api.ValidationConstraint>("get", false, `/validation`)
  }

}

/**
The Subscription Api Client - implements all operations from this logical endpoint
*/
export class SubscriptionClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getSubscription = (id: string) => {
    return this.api.request<Api.Void,Api.SubscriptionOverview>("get", false, `/subscriptions/${id}`)
  }
  
  postAppleTx = (tx : Api.AppleTransaction) => {
    return this.api.request<Api.AppleTransaction,Api.NoContent>("post", false, `/appletx`, tx)
  }
  
  postAndroidTx = (tx : Api.AndroidTransaction) => {
    return this.api.request<Api.AndroidTransaction,Api.NoContent>("post", false, `/androidtx`, tx)
  }

}

/**
The System Api Client - implements all operations from this logical endpoint
*/
export class SystemClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getVersion = () => {
    return this.api.request<Api.Void,string>("get", false, `/version`)
  }
  
  getClientVersion = () => {
    return this.api.request<Api.Void,number /* integer */>("get", false, `/clientversion`)
  }

}

/**
The Tag Api Client - implements all operations from this logical endpoint
*/
export class TagClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */,filter?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"filter":filter});
    return this.api.request<Api.Void,Api.PagedCollectionOfTag>("get", false, `/tags${qs}`)
  }
  
  post = (tagResource : Api.Tag) => {
    return this.api.request<Api.Tag,Api.Tag>("post", false, `/tags`, tagResource)
  }
  
  getAllSystem = (page?: string,pageSize?: number /* integer */,filter?: string) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize,"filter":filter});
    return this.api.request<Api.Void,Api.PagedCollectionOfSystemTag>("get", false, `/systemtags${qs}`)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.Tag>("get", false, `/tags/${id}`)
  }
  
  put = (id: string,tagResource : Api.Tag) => {
    return this.api.request<Api.Tag,Api.Tag>("put", false, `/tags/${id}`, tagResource)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/tags/${id}`)
  }

}

/**
The TimeCapsule Api Client - implements all operations from this logical endpoint
*/
export class TimeCapsuleClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  getAll = (page?: string,pageSize?: number /* integer */) => {
    var qs = this.buildQueryString({"page":page,"pageSize":pageSize});
    return this.api.request<Api.Void,Api.PagedCollectionOfTimeCapsule>("get", false, `/timecapsule/getall${qs}`)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.TimeCapsule>("get", false, `/timecapsule/get/${id}`)
  }
  
  postRecall = (id: string) => {
    return this.api.request<Api.Void,Api.TimeCapsule>("post", false, `/timecapsule/recall/${id}`)
  }
  
  post = (timeCapsuleResource : Api.TimeCapsuleCreation) => {
    return this.api.request<Api.TimeCapsuleCreation,Api.TimeCapsule>("post", false, `/timecapsule/update`, timeCapsuleResource)
  }
  
  put = (id: string,timeCapsuleResource : Api.TimeCapsule) => {
    return this.api.request<Api.TimeCapsule,Api.TimeCapsule>("put", false, `/timecapsule/update/${id}`, timeCapsuleResource)
  }
  
  delete = (id: string) => {
    return this.api.request<Api.Void,Api.NoContent>("delete", false, `/timecapsule/delete/${id}`)
  }

}

/**
The UserDevice Api Client - implements all operations from this logical endpoint
*/
export class UserDeviceClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  postChange = (deviceChange : Api.DeviceRegistrationChange) => {
    return this.api.request<Api.DeviceRegistrationChange,Api.NoContent>("post", false, `/userdevice`, deviceChange)
  }

}

/**
The Voucher Api Client - implements all operations from this logical endpoint
*/
export class VoucherClient extends ApiClientBase {
  constructor(public api: IApiClient){
    super();
  }
  
  register = (voucherId: string,registerModel : Api.RegisterModel) => {
    return this.api.request<Api.RegisterModel,Api.NoContent>("post", false, `/vouchers/${voucherId}/register`, registerModel)
  }
  
  transfer = (voucherId: string,transfer : Api.TransferRegisterModel) => {
    return this.api.request<Api.TransferRegisterModel,Api.NoContent>("post", false, `/vouchers/${voucherId}/transfer`, transfer)
  }
  
  verify = (voucherId: string,verification : Api.MobileVerifyModel) => {
    return this.api.request<Api.MobileVerifyModel,Api.Profile>("post", false, `/vouchers/${voucherId}/verify`, verification)
  }
  
  claim = (voucherId: string) => {
    return this.api.request<Api.Void,Api.Subscription>("post", false, `/vouchers/${voucherId}/claim`)
  }
  
  search = (email: string) => {
    var qs = this.buildQueryString({"email":email});
    return this.api.request<Api.Void,Api.IssuedVoucherModel[]>("get", false, `/vouchers${qs}`)
  }
  
  get = (id: string) => {
    return this.api.request<Api.Void,Api.IssuedVoucherModel>("get", false, `/vouchers/${id}`)
  }
  
  resendVerify = (verifyModel : Api.ResendVerifyModel) => {
    return this.api.request<Api.ResendVerifyModel,Api.NoContent>("post", false, `/vouchers/resendVerification`, verifyModel)
  }

}



/**
The Api Factory allows you to construct a single object and have access to all the generated Api Clients
*/
export class ApiFactory {
  constructor(private api: IApiClient){}

  /** The Account Api Client instance */
  account: AccountClient = new AccountClient(this.api);

  /** The Album Api Client instance */
  album: AlbumClient = new AlbumClient(this.api);

  /** The Auth Api Client instance */
  auth: AuthClient = new AuthClient(this.api);

  /** The Content Api Client instance */
  content: ContentClient = new ContentClient(this.api);

  /** The ContentProcessing Api Client instance */
  contentProcessing: ContentProcessingClient = new ContentProcessingClient(this.api);

  /** The Country Api Client instance */
  country: CountryClient = new CountryClient(this.api);

  /** The Family Api Client instance */
  family: FamilyClient = new FamilyClient(this.api);

  /** The File Api Client instance */
  file: FileClient = new FileClient(this.api);

  /** The FileType Api Client instance */
  fileType: FileTypeClient = new FileTypeClient(this.api);

  /** The Group Api Client instance */
  group: GroupClient = new GroupClient(this.api);

  /** The Invite Api Client instance */
  invite: InviteClient = new InviteClient(this.api);

  /** The Lifeline Api Client instance */
  lifeline: LifelineClient = new LifelineClient(this.api);

  /** The My Api Client instance */
  my: MyClient = new MyClient(this.api);

  /** The Notification Api Client instance */
  notification: NotificationClient = new NotificationClient(this.api);

  /** The Organisation Api Client instance */
  organisation: OrganisationClient = new OrganisationClient(this.api);

  /** The OrganisationUser Api Client instance */
  organisationUser: OrganisationUserClient = new OrganisationUserClient(this.api);

  /** The OrganisationVoucher Api Client instance */
  organisationVoucher: OrganisationVoucherClient = new OrganisationVoucherClient(this.api);

  /** The Person Api Client instance */
  person: PersonClient = new PersonClient(this.api);

  /** The Post Api Client instance */
  post: PostClient = new PostClient(this.api);

  /** The Profile Api Client instance */
  profile: ProfileClient = new ProfileClient(this.api);

  /** The ReferenceData Api Client instance */
  referenceData: ReferenceDataClient = new ReferenceDataClient(this.api);

  /** The Subscription Api Client instance */
  subscription: SubscriptionClient = new SubscriptionClient(this.api);

  /** The System Api Client instance */
  system: SystemClient = new SystemClient(this.api);

  /** The Tag Api Client instance */
  tag: TagClient = new TagClient(this.api);

  /** The TimeCapsule Api Client instance */
  timeCapsule: TimeCapsuleClient = new TimeCapsuleClient(this.api);

  /** The UserDevice Api Client instance */
  userDevice: UserDeviceClient = new UserDeviceClient(this.api);

  /** The Voucher Api Client instance */
  voucher: VoucherClient = new VoucherClient(this.api);
}

