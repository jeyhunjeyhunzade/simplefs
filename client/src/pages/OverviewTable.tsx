/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { blockAccounts, deleteAccounts, unBlockAccounts } from "@app/api/auth";
import { getUsers } from "@app/api/getUsers";
import Button from "@app/components/Button";
import StatusPill from "@app/components/StatusPill";
import { Routes } from "@app/router/rooter";
import { dateFormatter, errorHandler, successHandler } from "@app/utils";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "..";

const OverviewTable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);

  const onError = (error: unknown) => {
    if (error instanceof AxiosError) {
      console.log(error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
    navigate(Routes.login);
    errorHandler(error);
  };

  const onSuccess = (response: any) => {
    queryClient.invalidateQueries(["users"]);
    successHandler(response);
  };

  const { data: usersData, isSuccess } = useQuery<any>(["users"], getUsers, {
    onError,
    retry: false,
  });

  const { mutate: mutateBlock } = useMutation(blockAccounts, {
    onSuccess,
    onError,
  });

  const { mutate: mutateUnBlock } = useMutation(unBlockAccounts, {
    onSuccess,
    onError,
  });

  const { mutate: mutateDelete } = useMutation(deleteAccounts, {
    onSuccess,
    onError,
  });

  useEffect(() => {
    const usersDataWithFormattedTimes = usersData?.map((user: any) => {
      return {
        ...user,
        last_login: dateFormatter(user.last_login, true),
        register_time: dateFormatter(user.register_time),
      };
    });
    console.log("usersDataWithFormattedTimes: ", usersDataWithFormattedTimes);
    isSuccess && setData(usersDataWithFormattedTimes);
  }, [isSuccess]);

  const columns: any = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Last Login",
        accessor: "last_login",
      },
      {
        Header: "Registeration time",
        accessor: "register_time",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useRowSelectColumn
  );

  useEffect(() => {
    data?.length && setPageSize(data?.length);
  }, [setPageSize, data?.length]);

  const selectedIds = selectedFlatRows.map((item) => item.values?.id);

  const handleDelete = () => {
    mutateDelete(selectedIds);
  };

  const handleBlock = () => {
    mutateBlock(selectedIds);
  };

  const handleUnblock = () => {
    mutateUnBlock(selectedIds);
  };

  return (
    <div className="flex flex-col justify-center rounded-md border-[1px] border-zinc-900">
      <div className="flex justify-end p-6">
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleBlock}>Block</Button>
        <Button onClick={handleUnblock}>Unblock</Button>
      </div>
      <div className="flex h-full items-center">
        <div className="mt-2 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className=" border-b border-gray-200 shadow sm:rounded-lg">
                <table
                  {...getTableProps()}
                  className="b-[#bcbcbc] min-w-full divide-y divide-gray-200"
                >
                  <thead className="bg-gray-10">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className="text-20 rounded-sm px-6 py-5 text-lg font-medium uppercase tracking-wider text-gray-400"
                          >
                            {column.render("Header")}
                            {column.id === "selection" &&
                              column.render("Summary")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 bg-white"
                  >
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="whitespace-nowrap px-6 py-5 text-lg"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTable;
