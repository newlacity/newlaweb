/**
 * Discord : chaque valeur de champ d’embed est plafonnée à 1024 caractères
 * (voir https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure).
 * Le webhook ajoute un bloc ansi avec le libellé de la question au-dessus de la réponse.
 */

export const DISCORD_EMBED_FIELD_VALUE_MAX = 1024;

/** Plafond « sûr » pour les zones de texte du site (réponse seule, sous le titre ansi). */
export const DOSSIER_TEXTAREA_MAX_LENGTH = 900;

/** Champs courts (âge, dispo, nom de structure, type d’activité). */
export const DOSSIER_SHORT_INPUT_MAX_LENGTH = 200;
