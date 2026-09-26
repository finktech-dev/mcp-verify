/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * CLI i18n Helper
 *
 * Provides translation functions for CLI messages
 */

import { translations, type Language } from "../../i18n/catalog";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";

let currentLanguage: Language = "en";

export const SUPPORTED_LANGUAGES = ["en", "es"] as const;

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" && SUPPORTED_LANGUAGES.includes(value as Language)
  );
}

/**
 * Get user's preferred language from:
 * 1. Environment variable MCP_VERIFY_LANG
 * 2. Config file (~/.mcp-verify/config.json)
 * 3. Default to 'en'
 */
export function detectLanguage(): Language {
  // 1. Check environment variable
  const envLang = process.env.MCP_VERIFY_LANG;
  if (isLanguage(envLang)) {
    return envLang;
  }

  // 2. Check config file
  try {
    const configDir = path.join(os.homedir(), ".mcp-verify");
    const configFile = path.join(configDir, "config.json");
    if (fs.existsSync(configFile)) {
      const config: unknown = JSON.parse(fs.readFileSync(configFile, "utf-8"));
      if (
        typeof config === "object" &&
        config !== null &&
        isLanguage((config as Record<string, unknown>).language)
      ) {
        return (config as Record<string, Language>).language;
      }
    }
  } catch (e) {
    // Ignore config file errors
  }

  // 3. English is the product default; system locale does not override it.
  return "en";
}

/**
 * Initialize language (call once at startup)
 */
export function initLanguage(): Language {
  currentLanguage = detectLanguage();
  return currentLanguage;
}

/**
 * Get current language
 */
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

/**
 * Set language manually
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

/**
 * Translate a key with optional parameters
 * Usage: t('welcome_user', { name: 'Fink' }) -> "Welcome, Fink!"
 */
export function t(
  key: keyof typeof translations.en,
  params?: Record<string, string | number>,
  lang?: Language,
): string {
  const targetLang = lang || currentLanguage;
  let translation = (translations[targetLang] as typeof translations.en)[key];
  if (!translation) {
    // Fallback to English if translation missing
    translation = translations.en[key] || key;
  }

  if (params) {
    Object.keys(params).forEach((param) => {
      translation = translation.replace(
        new RegExp(`{${param}}`, "g"),
        String(params[param]),
      );
    });
  }

  return translation;
}

/**
 * Save language preference to config
 */
export function saveLanguagePreference(lang: Language): void {
  try {
    const configDir = path.join(os.homedir(), ".mcp-verify");
    const configFile = path.join(configDir, "config.json");

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    let config: Record<string, unknown> = {};
    if (fs.existsSync(configFile)) {
      const parsed: unknown = JSON.parse(fs.readFileSync(configFile, "utf-8"));
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed)
      ) {
        config = parsed as Record<string, unknown>;
      }
    }

    config.language = lang;
    const temporaryFile = `${configFile}.tmp`;
    fs.writeFileSync(temporaryFile, JSON.stringify(config, null, 2), "utf-8");
    fs.renameSync(temporaryFile, configFile);
  } catch {
    // Silently fail - not critical
  }
}
