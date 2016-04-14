# Pushit

## Deploy

In your `~/.ssh/config`:

```
Host IP
  ForwardAgent yes
```

Then:

`ssh-add`

Finally:

`pm2 deploy ecosystem.json production`
