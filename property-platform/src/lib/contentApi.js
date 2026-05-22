import { supabase } from './supabase'

const mediaBucket = 'site-media'

export async function fetchContent() {
  if (!supabase) throw new Error('Missing Supabase configuration')

  const [settingsResult, propertiesResult] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 'main').single(),
    supabase.from('properties').select('*').order('id', { ascending: true }),
  ])

  if (settingsResult.error) throw settingsResult.error
  if (propertiesResult.error) throw propertiesResult.error

  return {
    settings: settingsResult.data,
    properties: propertiesResult.data,
  }
}

export async function saveSettings(settings) {
  if (!supabase) throw new Error('Missing Supabase configuration')

  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ ...settings, id: 'main', updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function saveProperty(property) {
  if (!supabase) throw new Error('Missing Supabase configuration')

  const payload = {
    ...property,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('properties')
    .upsert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function uploadMedia(file, folder) {
  if (!supabase) throw new Error('Missing Supabase configuration')
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Select a valid image file')
  }

  const extension = file.name.split('.').pop() || 'jpg'
  const path = `${folder}/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from(mediaBucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) throw error

  const { data } = supabase.storage.from(mediaBucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteProperty(id) {
  if (!supabase) throw new Error('Missing Supabase configuration')

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}
