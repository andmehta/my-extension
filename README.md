# Rollout Extension

This project was created by copying the [rollout extension](https://github.com/argoproj-labs/rollout-extension)

## Install UI extension

To install the extension use the [argocd-extension-installer](https://github.com/argoproj-labs/argocd-extension-installer) init container which runs during the startup of the argocd server.
The init container downloads and extracts the JS file to `/tmp/extensions`. The argocd interface mounts the external JS file within the rollout resource.


### Kustomize Patch

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: argocd-server
spec:
  template:
    spec:
      initContainers:
        - name: my-extension
          image: quay.io/argoprojlabs/argocd-extension-installer:v0.0.1
          env:
            - name: EXTENSION_URL
              value: https://github.com/andmehta/my-extension/releases/download/v0.0.1/extension.tar
          securityContext:
            runAsUser: 1000
            allowPrivilegeEscalation: false
          volumeMounts:
            - name: extensions
              mountPath: /tmp/extensions/
      containers:
        - name: argocd-server
          volumeMounts:
            - name: extensions
              mountPath: /tmp/extensions/
      volumes:
        - name: extensions
          emptyDir: {}
```

### Helm Values

#### Using `server.extensions`

```yaml
server:
  extensions:
    enabled: true
    extensionList:
      - name: my-extension
        env:
          - name: EXTENSION_URL
            value: https://github.com/andmehta/my-extension/releases/download/v0.0.1/extension.tar
```

#### Using `server.initContainers`, `server.volumeMounts`, and `server.volumes` directly
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/rollout.yaml
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/service.yaml

```yaml
server:
  initContainers:
    - name: my-extension
      image: quay.io/argoprojlabs/argocd-extension-installer:v0.0.1
      env:
      - name: EXTENSION_URL
        value: https://github.com/andmehta/my-extension/releases/download/v0.0.1/extension.tar
      volumeMounts:
        - name: extensions
          mountPath: /tmp/extensions/
      securityContext:
        runAsUser: 1000
        allowPrivilegeEscalation: false
  volumeMounts:
    - name: extensions
      mountPath: /tmp/extensions/
  volumes:
    - name: extensions
      emptyDir: {}
```
