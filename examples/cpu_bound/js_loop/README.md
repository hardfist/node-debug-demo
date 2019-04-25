# 定位CPU 100%问题
## perf
```
node redos.js
perf record -F 99 -p `pgrep -n node` -g -- sleep 30
perf report
```
![perf](../../assets/perf.png)
根据这个信息可发现正则都花在了正则上，但是只有c++的代码，并没有js的信息

## perf + node --perf-basic-prof
```
node --perf-basic-prof redos.js
perf record -F 99 -p `pgrep -n node` -g -- sleep 30
perf report
```
![perf+prof](../../assets/perf+prof.png)
此时包含了更多的信息如大量的时间花在了`RegExp:([a-z]+)+$`这个正则上

## perf + 火焰图
```
node --perf-basic-prof redos.js
perf record -F 99 -p `pgrep -n node` -g -- sleep 30
perf script > out.nodestacks01
git clone --depth 1 http://github.com/brendangregg/FlameGraph
cd FlameGraph
./stackcollapse-perf.pl < ../out.nodestacks01 | ./flamegraph.pl > ../out.nodestacks01.svg
```
![perf+flamegraph](../../assets/flamegraph.svg)

### node + prof
v8有一个内置的性能分析工具，可以记录Javascript/C/C++的堆栈信息，该功能是默认关闭的，可以通过添加命令行参数--prof开启。
```
node --prof redos.js
node --prof-process isoloate-{id}.log > process.txt
```
生成的process.txt内容如下
![node+prof](../../assets/node+prof.png)
图片可以看出大部分的时间花在`RegExp: ([a-z]+)+$`