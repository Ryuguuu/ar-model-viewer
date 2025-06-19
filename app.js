// アプリケーションの主要な機能を実装するJavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // 要素の取得
    const loadingScreen = document.getElementById('loading-screen');
    const instructions = document.getElementById('instructions');
    const closeInstructionsBtn = document.getElementById('close-instructions');
    const toggleModelBtn = document.getElementById('toggle-model');
    
    // ARシーンが読み込まれたらローディング画面を非表示
    const scene = document.querySelector('a-scene');
    console.log('Scene element:', scene);
    
    scene.addEventListener('loaded', function () {
        console.log('A-Frame scene loaded');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
        
        // AR.jsの初期化状態を確認
        console.log('AR.js scene loaded');
        
        // AR.jsのコンポーネントを取得
        const arjs = scene.components['arjs'];
        if (arjs) {
            console.log('AR.js component found:', arjs);
            
            // markersAreaEnabledの状態を定期的にチェック
            setInterval(() => {
                if (arjs.arProfile && arjs.arProfile.trackingBackend) {
                    console.log('markersAreaEnabled:', arjs.arProfile.trackingBackend.markersAreaEnabled);
                    console.log('AR.js state:', arjs.arProfile.trackingBackend);
                } else {
                    console.log('AR.js profile not ready yet');
                }
            }, 2000);
        } else {
            console.log('AR.js component not found');
        }
    });

    // カメラアクセスエラー時の処理
    scene.addEventListener('camera-error', function() {
        console.error('Camera error occurred');
        alert('カメラへのアクセスができませんでした。ブラウザの設定を確認してください。');
    });

    // マーカーが検出されたときの処理
    const markers = document.querySelectorAll('a-marker');
    console.log('Found markers:', markers.length);
    
    markers.forEach((marker, index) => {
        console.log(`Setting up marker ${index}:`, marker);
        
        marker.addEventListener('markerFound', function() {
            console.log(`マーカー ${index} を検出しました`);
        });

        marker.addEventListener('markerLost', function() {
            console.log(`マーカー ${index} を見失いました`);
        });
        
        // GLBファイルの読み込み状態を監視
        const gltfEntity = marker.querySelector('[gltf-model]');
        if (gltfEntity) {
            console.log(`GLB entity found for marker ${index}:`, gltfEntity);
            
            gltfEntity.addEventListener('model-loaded', function() {
                console.log(`GLB model loaded for marker ${index}`);
            });
            
            gltfEntity.addEventListener('model-error', function(error) {
                console.error(`GLB model error for marker ${index}:`, error);
            });
        }
    });

    // 説明を閉じるボタンの処理
    closeInstructionsBtn.addEventListener('click', function() {
        instructions.classList.add('hidden');
    });

    // オフライン検出
    window.addEventListener('online', function() {
        console.log('オンラインに戻りました');
    });
    
    window.addEventListener('offline', function() {
        console.log('オフラインになりました');
        // オフラインモードの通知を表示するなどの処理を追加可能
    });
});