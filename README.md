## completer

completerは、コマンドライン引数の入力補完をサポートするためのツールです。  
設定ファイルで定義されたツリー構造に基づいて、次に続くべき引数の候補を提示します。

## インストール

```bash
npm install --global @kokiito0926/completer
```

## 使用方法

### コマンド

```bash
completer --config <設定ファイルへのパス> [入力途中のコマンド...]
```

### 設定ファイル

```javascript
export default {
    apps: {
        list: [],
        info: ["--json", "--short"],
        delete: ["app-1", "app-2", "app-3"],
    },
    config: {
        set: ["port", "host", "timeout"],
        get: ["port", "host", "timeout"],
    },
    deploy: ["production", "staging"],
};
```

### 実行例

```bash
$ completer --config ./example.js apps
list
info
delete
```

```bash
$ completer --config ./example.js apps info
--json
--short
```

## ライセンス

[MIT](LICENSE)
