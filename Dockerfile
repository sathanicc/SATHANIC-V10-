FROM 18
RUN https://github.com/sathanicc/SATHANIC-V10-.git/root/SATHANIC-V10-/
WORKDIR /root/SATHANIC-V10-/
RUN yarn install
CMD ["npm", "start"]
