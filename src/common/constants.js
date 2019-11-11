const FIELD_TYPES = {
  array_frame_name: 'array_frame_name',
  array_string: 'array_string',
  array_number: 'array_number',
  frame_name: 'frame_name',
  number: 'number',
  string: 'string',
  boolean: 'boolean'
}

const FIELD_TYPE_DETAILS = {
  [FIELD_TYPES.array_frame_name]: { name: 'Array<FrameName>' },
  [FIELD_TYPES.array_string]: { name: 'Array<String>' },
  [FIELD_TYPES.array_number]: { name: 'Array<Number>' },
  [FIELD_TYPES.frame_name]: { name: 'Frame Name' },
  [FIELD_TYPES.number]: { name: 'Number' },
  [FIELD_TYPES.string]: { name: 'String' },
  [FIELD_TYPES.boolean]: { name: 'Boolea' }
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
  FIELD_TYPE_DETAILS,
  ELECTRON_EVENTS
}
