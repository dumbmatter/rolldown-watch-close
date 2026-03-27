With Rollup, calling `watcher.close()` immediately fires the "close" event and resolves its returned promise, and any in-progress build is stopped (no bundle.js is created).

With Rolldown, calling `watcher.close()` waits until the current in-progress build is done and written to disk before firing the "close" event and resolving the returned promise (bundle.js is created).

It is confusing to me that calling Rolldown's `watcher.close()` does not prevent an in-progress build from being written to disk.

Example in this repo. You can see that Rolldown still emits BUNDLE_END and END even after `watcher.close()` is called, but Rollup does not.

```
$ node rollup.js
START
BUNDLE_START
[delay-plugin] sleeping 2000ms
call watcher.close
close event
watcher.close promise resolves
```

```
$ node rolldown.js
START
BUNDLE_START
[delay-plugin] sleeping 2000ms
call watcher.close
BUNDLE_END
END
close event
watcher.close promise resolves
```
