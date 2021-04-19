import * as impl from './impl';
import {
  FirebaseApp,
  FirebaseAppConfig,
  FirebaseOptions,
  isFirebaseApp,
  isFirebaseOptions,
} from './types';
import { defaultAppName, isString, isUndefined } from './common';
import { defaultAppNotInitialized, invalidApp, noApp } from './errors';

export * from './types';

/**
 * The current SDK version.
 */
export const SDK_VERSION = 'TODO';

/**
 * Renders this app unusable and frees the resources of all associated services.
 *
 * @param app
 * @returns
 */
export function deleteApp(app: FirebaseApp): Promise<void> {
  if (!isFirebaseApp(app)) {
    throw invalidApp();
  }

  if (app.name === defaultAppName) {
    throw new Error('Cannot delete the default app!');
  }

  return impl.deleteApp(app.name);
}

/**
 * Retrieves a FirebaseApp instance.
 *
 * When called with no arguments, the default app is returned. When an app name is provided, the app corresponding to that name is returned.
 *
 * @param name Optional name of the app to return. If no name is provided, the default is "[DEFAULT]".
 * @returns FirebaseApp
 */
export function getApp(name?: string): FirebaseApp {
  const app = impl.getApp(name);

  if (!app) {
    if (!name || name === defaultAppName) {
      throw defaultAppNotInitialized();
    }

    throw noApp(name);
  }

  return app;
}

/**
 * A (read-only) array of all initialized apps.
 *
 * @returns
 */
export function getApps(): ReadonlyArray<FirebaseApp> {
  return impl.getApps();
}

/**
 * Creates and initializes a FirebaseApp instance.
 *
 * @param options Options to configure the app's services.
 * @param name Optional name of the app to initialize. If no name is provided, the default is "[DEFAULT]".
 */
export function initializeApp(options: FirebaseOptions, name?: string): Promise<FirebaseApp>;

/**
 * Creates and initializes a FirebaseApp instance.
 *
 * @param options Options to configure the app's services.
 * @param config FirebaseApp Configuration.
 */
export function initializeApp(
  options: FirebaseOptions,
  config?: FirebaseAppConfig,
): Promise<FirebaseApp>;

export async function initializeApp(
  options: FirebaseOptions,
  nameOrConfig?: string | FirebaseAppConfig,
): Promise<FirebaseApp> {
  if (!isFirebaseOptions(options)) {
    throw new Error(`Argument 'options' is not a valid FirebaseOptions object.`);
  }

  if (isUndefined(nameOrConfig)) {
    return impl.initializeApp(options);
  }

  if (isString(nameOrConfig)) {
    return impl.initializeApp(options, {
      name: nameOrConfig,
    });
  }

  return impl.initializeApp(options, nameOrConfig);
}

/**
 * Sets log handler for all Firebase SDKs.
 */
export function onLog() {}

// https://firebase.google.com/docs/reference/js/v9/app.md#registerversion
// registerVersion?

export function setLogLevel() {}