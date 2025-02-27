use proteus_audio::peaks::get_peaks;
use std::collections::HashMap;
use std::path::Path;

pub async fn analyze(audio_file_path: String, update_metadata_token: String) -> Result<(), String> {
    let path = Path::new(&audio_file_path);
    if !path.exists() {
        return Err("File does not exist".to_string());
    }

    let mut result: Vec<f32> = Vec::new();

    let peaks = get_peaks(&audio_file_path, false);

    // shrink a little bit
    let channel = &peaks[0];
    for i in 0..channel.len() {
        if i % 100 == 0 {
            result.push(channel[i].0);
        }
    }

    let mut body = HashMap::new();
    body.insert("peaks", result);

    let route = format!(
        "http://localhost:5129/api/samples/metadata/{}",
        update_metadata_token
    );

    let response = reqwest::Client::new().patch(route).json(&body).send().await;

    match response {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
