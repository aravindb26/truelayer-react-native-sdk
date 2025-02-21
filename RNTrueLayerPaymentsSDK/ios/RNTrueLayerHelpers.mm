#import <Foundation/Foundation.h>
#import "RNTrueLayerHelpers.h"

@implementation RNTrueLayerHelpers: NSObject

// MARK: - Single Payment

+ (NSString *)stepFromSinglePaymentState:(TrueLayerSinglePaymentState)state {
  switch (state) {
  case TrueLayerSinglePaymentStateAuthorized:
    return @"Authorized";
    
  case TrueLayerSinglePaymentStateExecuted:
    return @"Executed";
    
  case TrueLayerSinglePaymentStateRedirect:
    return @"Redirect";
    
  case TrueLayerSinglePaymentStateSettled:
    return @"Settled";
    
  case TrueLayerSinglePaymentStateWait:
    return @"Wait";
  }
}

+ (NSString *)reasonFromSinglePaymentError:(TrueLayerSinglePaymentError)error {
  switch (error) {
  case TrueLayerSinglePaymentErrorAuthorizationFailed:
    return @"PaymentFailed";
    
  case TrueLayerSinglePaymentErrorConnectionIssues:
    return @"CommunicationIssue";
    
  case TrueLayerSinglePaymentErrorGeneric:
    return @"Unknown";

  case TrueLayerSinglePaymentErrorInvalidRedirectURI:
    return @"InvalidRedirectURI";

  case TrueLayerSinglePaymentErrorInvalidToken:
    return @"ConnectionSecurityIssue";
    
  case TrueLayerSinglePaymentErrorPaymentExpired:
    return @"PaymentFailed";
    
  case TrueLayerSinglePaymentErrorPaymentNotFound:
    return @"PaymentFailed";
    
  case TrueLayerSinglePaymentErrorPaymentRejected:
    return @"PaymentFailed";
    
  case TrueLayerSinglePaymentErrorSdkNotConfigured:
    return @"ProcessorContextNotAvailable";
    
  case TrueLayerSinglePaymentErrorServerError:
    return @"ConnectionSecurityIssue";
    
  case TrueLayerSinglePaymentErrorUnexpectedBehavior:
    return @"Unknown";
    
  case TrueLayerSinglePaymentErrorUserCanceled:
    return @"UserAborted";

  case TrueLayerSinglePaymentErrorProviderOffline:
    return @"ProviderOffline";
  }
}

+ (NSString *)statusFromSinglePaymentStatus:(TrueLayerSinglePaymentStatus)status {
  switch (status) {
  case TrueLayerSinglePaymentStatusAuthorizationRequired:
    return @"AuthorizationRequired";
    
  case TrueLayerSinglePaymentStatusAuthorizing:
    return @"Authorizing";
    
  case TrueLayerSinglePaymentStatusAuthorized:
    return @"Authorized";
    
  case TrueLayerSinglePaymentStatusExecuted:
    return @"Executed";
    
  case TrueLayerSinglePaymentStatusSettled:
    return @"Settled";
    
  case TrueLayerSinglePaymentStatusFailed:
    return @"Failed";
  }
}

// MARK: - Mandate

+ (NSString *)stepFromMandateState:(TrueLayerMandateState)state {
  switch (state) {
  case TrueLayerMandateStateAuthorized:
    return @"Authorized";
    
  case TrueLayerMandateStateRedirect:
    return @"Redirect";
  }
}

+ (NSString *)reasonFromMandateError:(TrueLayerMandateError)error {
  switch (error) {
  case TrueLayerMandateErrorAuthorizationFailed:
    return @"PaymentFailed";
    
  case TrueLayerMandateErrorConnectionIssues:
    return  @"CommunicationIssue";
    
  case TrueLayerMandateErrorGeneric:
    return @"Unknown";
    
  case TrueLayerMandateErrorInvalidToken:
    return @"ConnectionSecurityIssue";
    
  case TrueLayerMandateErrorMandateExpired:
    return @"PaymentFailed";

  case TrueLayerMandateErrorInvalidRedirectURI:
    return @"InvalidRedirectURI";

  case TrueLayerMandateErrorMandateNotFound:
    return @"PaymentFailed";
    
  case TrueLayerMandateErrorMandateRejected:
    return @"PaymentFailed";
    
  case TrueLayerMandateErrorRevoked:
    return @"PaymentFailed";
    
  case TrueLayerMandateErrorSdkNotConfigured:
    return @"ProcessorContextNotAvailable";
    
  case TrueLayerMandateErrorServerError:
    return @"ConnectionSecurityIssue";
    
  case TrueLayerMandateErrorUnexpectedBehavior:
    return @"Unknown";
    
  case TrueLayerMandateErrorUserCanceled:
    return @"UserAborted";

  case TrueLayerMandateErrorProviderOffline:
    return @"ProviderOffline";
  }
}

+ (NSString *)statusFromMandateStatus:(TrueLayerMandateStatus)status {
  switch (status) {
  case TrueLayerMandateStatusAuthorizationRequired:
    return @"AuthorizationRequired";
    
  case TrueLayerMandateStatusAuthorizing:
    return @"Authorizing";
    
  case TrueLayerMandateStatusAuthorized:
    return @"Authorized";
    
  case TrueLayerMandateStatusRevoked:
    return @"Revoked";
    
  case TrueLayerMandateStatusFailed:
    return @"Failed";
  }
}

@end