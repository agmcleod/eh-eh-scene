const FIELD_TYPES = {
  array_string: 'array_string',
  array_number: 'array_number',
  number: 'number',
  string: 'string',
  boolean: 'boolean'
}

const ELECTRON_EVENTS = {
  save_data: 'save-data',
  save_requested: 'save-requested',
  import_map: 'import-map',
  import_map_success: 'import-map-success',
  open_level: 'open-level'
}

module.exports = {
  FIELD_TYPES,
  ELECTRON_EVENTS
}
