Module['preRun'].push(function () {
	FS.createFolder(
			'/', // 親フォルダの指定
			'data', // フォルダ名
			true, // 読み込み許可
			true // 書き込み許可(今回の例はfalseでもよさげ)
		       );
	FS.createPreloadedFile(
			'/', // 親フォルダの指定
			'input.txt', // ソース中でのファイル名
			'/input.txt', // httpでアクセスする際のURLを指定
			true, // 読み込み許可
			false // 書き込み許可
			);
	FS.createPreloadedFile(
			'/data',
			'input.txt',
			'/data/input.txt',  // httpでアクセスする際のURLを指定
			true,
			false
			);
);
