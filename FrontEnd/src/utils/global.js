
/**
 * @file global.tsx
 * This file contains global configurations used throughout the project.
 */

/**
 * global - an object to store the environment configuration.
 * @type {Object}
 * @property {string} environment - Specifies the working environment.
 *                                  'prod' for production,
 *                                  'dev' for development,
 *                                  'local' for local development.
 */
export const global = {
    environment: 'local'
}

/**
 * base_url_be - Base URL for backend services.
 * Determines the URL based on the selected environment setting.
 * @type {string}
 */
export const base_url_be =
    global.environment == 'prod'
        ? 'http://127.0.0.1:3333/'
        : global.environment == 'dev'
            ? 'http://127.0.0.1:3333/'
            : global.environment == 'localnetwork'
                ? 'http://192.168.0.2:3333/'
                : 'http://localhost:5000/'

/**
 * base_url - Base URL for the frontend services.
 * Sets the URL according to the environment setting.
 * @type {string}
 */
export const base_url =
    global.environment == 'prod'
        ? 'http://localhost:3000/'
        : global.environment == 'dev'
            ? 'http://localhost:3000/'
            : 'http://localhost:5173/'

export const filePath = base_url_be + 'uploads/'