/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

export type HelpCategory = "security" | "infra" | "workspace" | "utils";

export interface HelpCommand {
  /** Nombre primario del comando */
  name: string;
  /** Aliases cortos */
  aliases: string[];
  /** Categoría para agrupar en la paleta */
  category: HelpCategory;
  /** Clave i18n de la descripción */
  descKey: string;
  /** Ejemplo literal a mostrar en el panel de detalle */
  example?: string;
  /** Flags clave a mostrar en el panel de detalle */
  flags?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Registro de comandos
// ─────────────────────────────────────────────────────────────────────────────

export const HELP_COMMANDS: HelpCommand[] = [
  // ── Seguridad ──────────────────────────────────────────────────────────────
  {
    name: "validate",
    aliases: ["v"],
    category: "security",
    descKey: "cmd_validate_desc",
    example: 'validate "node server.js" --format json',
    flags: [
      "--format <json|html|sarif>",
      "--sandbox",
      "--save-baseline <path>",
    ],
  },
  {
    name: "scan-config",
    aliases: [],
    category: "security",
    descKey: "cmd_scan_config_desc",
    example: "scan-config .mcp.json",
    flags: ["--all", "--quiet"],
  },
  {
    name: "doctor",
    aliases: ["d"],
    category: "security",
    descKey: "cmd_doctor_desc",
    example: "doctor http://localhost:3000 --verbose",
    flags: ["--verbose", "--watch", "--html", "--json", "--output <path>"],
  },
  // ── Infraestructura ────────────────────────────────────────────────────────
  {
    name: "mock",
    aliases: ["m"],
    category: "infra",
    descKey: "cmd_mock_desc",
    example: "mock --port 3000",
    flags: ["--port <n>", "--timeout <ms>"],
  },
  {
    name: "init",
    aliases: [],
    category: "infra",
    descKey: "cmd_init_desc",
    example: "init",
  },

  // ── Workspace ──────────────────────────────────────────────────────────────
  {
    name: "target",
    aliases: [],
    category: "workspace",
    descKey: "cmd_target_desc",
    example: 'target "node server.js"',
  },
  {
    name: "profile",
    aliases: [],
    category: "workspace",
    descKey: "cmd_profile_desc",
    example: "profile set aggressive",
    flags: ["set <light|balanced|aggressive>", "list", "show", "save <name>"],
  },
  {
    name: "context",
    aliases: [],
    category: "workspace",
    descKey: "cmd_context_desc",
    example: "context list",
    flags: ["list", "switch <name>", "create <name>", "delete <name>"],
  },
  {
    name: "history",
    aliases: [],
    category: "workspace",
    descKey: "interactive_show_history_desc",
    example: "history --last 20",
    flags: ["--last <n>", "--clear"],
  },
  {
    name: "config",
    aliases: ["cfg"],
    category: "workspace",
    descKey: "interactive_show_config_desc",
    example: "config",
  },
  {
    name: "lang",
    aliases: ["language"],
    category: "workspace",
    descKey: "change_language_cambiar_idioma",
    example: "lang es",
  },
  {
    name: "status",
    aliases: [],
    category: "workspace",
    descKey: "cmd_status_desc",
    example: "status",
  },

  // ── Utilidades ─────────────────────────────────────────────────────────────
  {
    name: "about",
    aliases: [],
    category: "utils",
    descKey: "interactive_about_desc_title",
    example: "about",
  },
  {
    name: "github",
    aliases: ["gh"],
    category: "utils",
    descKey: "interactive_open_github_desc",
    example: "github",
  },
  {
    name: "linkedin",
    aliases: ["li"],
    category: "utils",
    descKey: "interactive_open_linkedin_desc",
    example: "linkedin",
  },
  {
    name: "help",
    aliases: ["h"],
    category: "utils",
    descKey: "cmd_help",
    example: "help",
  },
  {
    name: "clear",
    aliases: ["cls"],
    category: "utils",
    descKey: "cmd_clear",
    example: "clear",
  },
  {
    name: "exit",
    aliases: ["q", "quit"],
    category: "utils",
    descKey: "cmd_exit",
    example: "exit",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de búsqueda
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fuzzy match: todos los chars del query aparecen en orden en el target.
 * También hace substring match directo para mayor precisión.
 */
export function fuzzyMatch(query: string, target: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

/**
 * Filtra y ordena comandos según la búsqueda:
 * 1. Coincidencia exacta al inicio del nombre
 * 2. Substring match en nombre/alias
 * 3. Fuzzy match en nombre/alias/categoría
 */
export function filterCommands(
  query: string,
  commands: HelpCommand[],
): HelpCommand[] {
  if (!query) return commands;
  const q = query.toLowerCase();

  return commands
    .map((cmd) => {
      const allNames = [cmd.name, ...cmd.aliases];
      const nameMatch = allNames.some((n) => n.toLowerCase().startsWith(q));
      const subMatch = allNames.some((n) => n.toLowerCase().includes(q));
      const fuzzy = allNames.some((n) => fuzzyMatch(q, n));
      const score = nameMatch ? 3 : subMatch ? 2 : fuzzy ? 1 : 0;
      return { cmd, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ cmd }) => cmd);
}

/** Mapa de categoría → clave i18n del título */
export const CATEGORY_TITLE_KEYS: Record<HelpCategory, string> = {
  security: "interactive_security_tools",
  infra: "help_category_infra",
  workspace: "interactive_workspace_profiles",
  utils: "interactive_utilities",
};
