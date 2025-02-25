use proteus_audio::peaks::get_peaks;
use std::path::Path;

fn check_if_file_exists(audio_file_path: &str) -> bool {
    let path = Path::new(audio_file_path);
    path.exists()
}

pub async fn calculate_peaks(audio_file_path: &str) -> Result<Vec<f32>, String> {
    if !check_if_file_exists(audio_file_path) {
        return Err("File does not exist".to_string());
    }
    let mut result: Vec<f32> = Vec::new();

    let peaks = get_peaks(&audio_file_path, false);

    let channel = &peaks[0];
    for i in 0..channel.len() {
        if i % 100 == 0 {
            result.push(channel[i].0);
        }
    }

    Ok(result)
}