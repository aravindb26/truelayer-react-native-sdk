import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import React from 'react'

import {
  TrueLayerPaymentsSDKWrapper,
  Environment,
  PaymentUseCase,
  ResultType,
} from 'rn-truelayer-payments-sdk'

import uuid from 'react-native-uuid'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {log} from './utils/logger'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  }

  const androidTheme = {
    lightColors: {
      primary: '#FF32A852',
      background: '#EEEEEE',
      surface: '#CCCCCC',
      error: '#000000',
    },
    darkColors: {
      primary: '#888888',
      background: '#000000',
    },
    typography: {
      bodyLarge: {
        font: 'rainbow_2000',
      },
    },
  }

  const iOSTheme = {
    fontFamilyName: 'Kanit',
  }

  const theme = {
    android: androidTheme,
    ios: iOSTheme,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Pressable
          style={styles.button}
          onPress={() => {
            log('configure button clicked')

            TrueLayerPaymentsSDKWrapper.configure(
              Environment.Sandbox,
              theme,
            ).then(
              () => {
                log('Configure success')
              },
              reason => {
                log(
                  'Configure failed ' +
                    JSON.stringify(reason.userInfo, null, 4),
                )
              },
            )
          }}>
          <Text testID={'init'} style={styles.text}>
            Start SDK
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={processPayment}>
          <Text testID={'processPayment'} style={styles.text}>
            Process Single Payment
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={getSinglePaymentStatus}>
          <Text testID={'getPayment'} style={styles.text}>
            Get Single Payment Status
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={processMandate}>
          <Text testID={'processMandate'} style={styles.text}>
            Process Mandate
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={getMandateStatus}>
          <Text testID={'getMandate'} style={styles.text}>
            Get Mandate Status
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function processPayment(): void {
  log('processPayment button clicked')

  getPaymentContext('payment').then(processorContext => {
    log(
      `payment`,
      `id: ${processorContext.id}`,
      `resource_token: ${processorContext.resource_token}`,
    )

    TrueLayerPaymentsSDKWrapper.processPayment(
      {
        paymentId: processorContext.id,
        resourceToken: processorContext.resource_token,
        redirectUri: 'truelayer://payments_sample',
      },
      {
        paymentUseCase: PaymentUseCase.Send,
      },
    ).then(result => {
      switch (result.type) {
        case ResultType.Success:
          log(`processPayment success at step: ${result.step}`)
          break
        case ResultType.Failure:
          log(
            `Oh we've failed processPayment with following reason: ${result.reason}`,
          )
          break
      }
    })
  })
}

function getSinglePaymentStatus(): void {
  log('getSinglePaymentStatus button clicked')
  getPaymentContext('payment').then(processorContext => {
    log(
      `payment`,
      `id: ${processorContext.id}`,
      `resource_token: ${processorContext.resource_token}`,
    )

    TrueLayerPaymentsSDKWrapper.paymentStatus(
      processorContext.id,
      processorContext.resource_token,
    ).then(result => {
      switch (result.type) {
        case ResultType.Success:
          log(`getSinglePaymentStatus success at step: ${result.status}`)
          break
        case ResultType.Failure:
          log(
            `Oh we've failed getSinglePaymentStatus with following reason: ${result.failure}`,
          )
          break
      }
    })
  })
}

function processMandate(): void {
  log('processMandate button clicked')

  getPaymentContext('mandate').then(processorContext => {
    log(
      `mandate`,
      `id: ${processorContext.id}`,
      `resource_token: ${processorContext.resource_token}`,
    )
    TrueLayerPaymentsSDKWrapper.processMandate({
      mandateId: processorContext.id,
      resourceToken: processorContext.resource_token,
      redirectUri: 'truelayer://payments_sample',
    }).then(result => {
      switch (result.type) {
        case ResultType.Success:
          log(`processMandate success at step: ${result.step}`)
          break
        case ResultType.Failure:
          log(
            `Oh we've failed processMandate with following reason: ${result.reason}`,
          )
          break
      }
    })
  })
}

function getMandateStatus(): void {
  log('getMandateStatus button clicked')

  getPaymentContext('mandate').then(processorContext => {
    log(
      `mandate`,
      `id: ${processorContext.id}`,
      `resource_token: ${processorContext.resource_token}`,
    )
    TrueLayerPaymentsSDKWrapper.mandateStatus(
      processorContext.id,
      processorContext.resource_token,
    ).then(result => {
      switch (result.type) {
        case ResultType.Success:
          log(`getMandateStatus success: ${result.status}`)
          break
        case ResultType.Failure:
          log(
            `Oh we've failed getMandateStatus with following reason: ${result.failure}`,
          )
          break
      }
    })
  })
}

interface SamplePaymentContext {
  id: string
  resource_token: string
}

/**
 * This one will fetch the token for mandate from the payments quickstart project
 * Amend the url to match your instance.
 */
async function getPaymentContext(
  type: 'mandate' | 'payment',
): Promise<SamplePaymentContext> {
  return await fetch('http://localhost:3000/v3/' + type, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: uuid.v4(),
      amount_in_minor: '1',
      currency: 'GBP',
      payment_method: {
        statement_reference: 'some ref',
        type: 'bank_transfer',
      },
      beneficiary: {
        type: 'external_account',
        name: 'John Doe',
        reference: 'Test Ref',
        scheme_identifier: {
          type: 'sort_code_account_number',
          account_number: '12345677',
          sort_code: '123456',
        },
      },
    }),
  })
    .then(response => response.json())
    .then(json => {
      log(json)
      return json
    })
    .catch(error => {
      console.error(error)
      return null
    })
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 32,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
