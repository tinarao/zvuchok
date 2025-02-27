mod audio;
use crate::audio::analyze;

#[tauri::command]
async fn analyze_track(path: String, update_metadata_token: String) -> Result<(), String> {
    analyze(path, update_metadata_token).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![analyze_track])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
